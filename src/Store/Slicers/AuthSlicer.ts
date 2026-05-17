import { StateCreator } from 'zustand';

import { AuthService } from '../../services';
import { ServerError } from '../../constants';
import { SocketService } from '../../services';

import { ICommonSlicer } from './CommonSlicer';
import { ISupportSlicer } from './SupportSlicer';
import { IModalSlicer } from './ModalSlicer';
import { IProductSlicer } from './ProductSlicer';

export interface IAuthSlicer {
  email: string;
  token: string;
  userId: string;
  userRole: 'user' | 'support';
  isAuthenticated: boolean;
  isVerifyUser: boolean;

  onSubmitLogin: (data: { email: string; password: string }) => Promise<unknown>;
  onSubmitLogout: () => Promise<void>;
  onSubmitRegister: (data: { email: string; password: string; year: string }) => Promise<unknown>;
  verifyAccountWithToken: (token: string | undefined) => Promise<void>;
}

type TFullStore = IAuthSlicer & ICommonSlicer & ISupportSlicer & IModalSlicer & IProductSlicer;

const authService = AuthService();

const createAuthSlicer: StateCreator<TFullStore, [], [], IAuthSlicer> = (set, get) => ({
  email: '',
  token: '',
  userId: '',
  userRole: 'user',
  isAuthenticated: false,
  isVerifyUser: false,

  onSubmitLogin: async ({ email, password }: { email: string; password: string }) => {
    try {
      const { connectId } = get();
      const result = await authService.login({ email, password, connectId });
      if (result.messageCode === ServerError.SUCCESSFULLY_LOGIN.messageCode) {
        const { userInfo } = result;
        set({
          email: userInfo.email,
          token: userInfo.accessToken,
          userId: String(userInfo.id ?? userInfo._id),
          userRole: userInfo.role,
          isAuthenticated: !!userInfo.accessToken,
          isVerifyUser: userInfo.isVerify,
        });
      }
      return result;
    } catch (err) {
      return err;
    }
  },

  onSubmitLogout: async () => {
    try {
      const { resetRooms, resetMessages, setWelcomeMessage } = get();
      set({
        email: '',
        token: '',
        userId: '',
        userRole: 'user',
        isAuthenticated: false,
        isVerifyUser: false,
      });
      resetRooms();
      resetMessages();
      setWelcomeMessage({ message: '' });
      SocketService.disconnect();
      SocketService.connect();
    } catch (_err) {
      // silent — logout always clears local state
    }
  },

  onSubmitRegister: async ({ email, password, year }: { email: string; password: string; year: string }) => {
    try {
      const result = await authService.register({ email, password, year });
      return result;
    } catch (err) {
      return err;
    }
  },

  verifyAccountWithToken: async (token) => {
    if (!token) return;
    try {
      await authService.verifyToken({ token });
    } catch (_err) {
      // silent
    }
  },
});

export default createAuthSlicer;
