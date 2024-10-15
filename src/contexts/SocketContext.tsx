import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents, ESendEvents, MODAL_NAMES, STORAGE_KEYS } from '../Constants';

import { useGetUserAddress, useLocalStorage, useStoreZ } from "../hooks";

import { useAuthContext } from "./AuthContext";

import { IUserQueue } from "../Store/Slicers/SupportSlicer";

export interface INotifyAdminOfNewUser {
    newUserSocketId: string;
    userQueue: IUserQueue[];
}

interface ISocketContext { }

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { connectId } = useAuthContext();


    const [_, setConnectId] = useLocalStorage(STORAGE_KEYS.CONNECT_ID, {});

    const { openModal, setModalName, setContent, setUsers } = useStoreZ();

    const userAddressData = useGetUserAddress();

    const result = useCallback((data: any) => {
        setModalName(MODAL_NAMES.NEW_BOOK);
        setContent(data);
        openModal();
    }, [setModalName, setContent, openModal]);

    const updateCountOfVisitors = (data: any) => {
        console.log(data)
    }

    const saveConnectId = (data: { connectId: string }) => {
        if (!connectId) {
            setConnectId(data.connectId)
        }
        // Attach support message.
    }

    const notifyAdmin = (data: INotifyAdminOfNewUser) => {
        const newUser = data.userQueue.filter(u => u.currentSocketId === data.newUserSocketId)[0];
        if (newUser?.connectId) {
            setUsers(newUser)
        }
    };

    const supportMessage = (data: any) => {
        console.log('supportMessage', data)
    }

    useEffect(() => {
        SocketService.connect();

        SocketService.subscribeToEvent(EReceiveEvents.NEW_BOOK_ADDED, result);
        SocketService.subscribeToEvent(EReceiveEvents.USER_JOINED, updateCountOfVisitors);
        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT, saveConnectId);

        SocketService.subscribeToEvent(EReceiveEvents.NOTIFY_ADMINS_OF_NEW_USER, notifyAdmin);

        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_MESSAGE, supportMessage);
        return () => {
            SocketService.unsubscribeFromEvent(EReceiveEvents.NEW_BOOK_ADDED, () => console.log('Unsubscribe NEW_BOOK_ADDED'))
            SocketService.disconnect();
        }
    }, []);

    useEffect(() => {
        if (userAddressData.hasOwnProperty('IPv4')) {
            SocketService.sendData(ESendEvents.USER_JOINED, userAddressData);
        }
    }, [userAddressData]);

    return (
        <SocketContext.Provider value={SocketService}>
            {children}
        </SocketContext.Provider>
    );
}


export const useSocketContext = () => useContext(SocketContext);