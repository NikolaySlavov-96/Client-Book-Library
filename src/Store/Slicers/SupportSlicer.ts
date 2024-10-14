import { StateCreator } from "zustand";


interface IUserQueue {
    connectId: string;

    currentSocketId: string;

    role: 'user' | 'support'

    status: "waiting"
}
interface INotifyAdminOfNewUser {
    newUserSocketId: string;
    userQueue: IUserQueue[];
}

export interface SupportSlicer {
    users: INotifyAdminOfNewUser[];
    setUsers: (newData: any) => void;
}

const createSupportSlicer: StateCreator<SupportSlicer> = (set) => ({
    users: [],
    setUsers: (newUser) => set(state => ({
        users: [...state.users, newUser],
    })),
});

export default createSupportSlicer;