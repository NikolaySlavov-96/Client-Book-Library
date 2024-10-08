import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents, ESendEvents, MODAL_NAMES } from '../Constants';

import { useGetUserAddress, useStoreZ } from "../hooks";
import { useAuthContext } from "./AuthContext";

interface ISocketContext { }

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const { email } = useAuthContext();
    const { openModal, setModalName, setContent, } = useStoreZ();

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
        // Save connectId in localStorage
        console.log("🚀 ~ saveConnectId ~ data:", data)
    }

    const notifyAdmin = (data: any) => console.log('NOTIFY_ADMINS_OF_NEW_USER', data);


    useEffect(() => {
        SocketService.connect();

        SocketService.subscribeToEvent(EReceiveEvents.NEW_BOOK_ADDED, result);
        SocketService.subscribeToEvent(EReceiveEvents.USER_JOINED, updateCountOfVisitors);
        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT, saveConnectId);

        SocketService.subscribeToEvent(EReceiveEvents.NOTIFY_ADMINS_OF_NEW_USER, notifyAdmin);

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

    // Moved in Chat window
    // Run this at press open chatWindow
    useEffect(() => {
        if (email) {
            // SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId: 'da51f92c-35b9-4c7a-9705-da4aa5f58102', });
        } else {
            // SocketService.sendOnlySignal(ESendEvents.SUPPORT_CHAT_USER_JOIN);
        }
    }, [email]);

    return (
        <SocketContext.Provider value={SocketService}>
            {children}
        </SocketContext.Provider>
    );
}


export const useSocketContext = () => useContext(SocketContext);