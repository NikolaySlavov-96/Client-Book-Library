import { createContext, useCallback, useContext, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents } from '../Constants';
import { useBookContext } from "./BookContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { setBookModal } = useBookContext();;

    const result = useCallback((data) => {
        setBookModal(prevBookModal => [...prevBookModal, data]);
    }, []);

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