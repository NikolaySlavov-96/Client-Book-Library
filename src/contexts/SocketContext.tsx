import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents, MODAL_NAMES } from '../Constants';

import { useStoreZ } from "../hooks";

interface ISocketContext { }

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const { openModal, setModalName, setContent, } = useStoreZ();

    const result = useCallback((data: any) => {
        setModalName(MODAL_NAMES.NEW_BOOK);
        setContent(data);
        openModal();
    }, [setModalName, setContent, openModal]);

    useEffect(() => {
        SocketService.connect();

        SocketService.subscribeToEvent(EReceiveEvents.NEW_BOOK_ADDED, result);

        return () => {
            SocketService.unsubscribeFromEvent(EReceiveEvents.NEW_BOOK_ADDED, () => console.log(';222'))
            SocketService.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={SocketService}>
            {children}
        </SocketContext.Provider>
    );
}


export const useSocketContext = () => useContext(SocketContext);