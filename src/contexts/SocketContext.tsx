import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents, ESendEvents, MODAL_NAMES } from '../Constants';

import { useGetUserAddress, useStoreZ } from "../hooks";

interface ISocketContext { }

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const { openModal, setModalName, setContent, } = useStoreZ();

    const userAddressData = useGetUserAddress();

    const result = useCallback((data: any) => {
        setModalName(MODAL_NAMES.NEW_BOOK);
        setContent(data);
        openModal();
    }, [setModalName, setContent, openModal]);

    useEffect(() => {
        SocketService.connect();

        SocketService.subscribeToEvent(EReceiveEvents.NEW_BOOK_ADDED, result);
        SocketService.subscribeToEvent(EReceiveEvents.USER_JOINED, (data) => console.log(data));

        return () => {
            SocketService.unsubscribeFromEvent(EReceiveEvents.NEW_BOOK_ADDED, () => console.log(';222'))
            SocketService.disconnect();
        }
    }, []);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ userAddressData:", userAddressData)
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