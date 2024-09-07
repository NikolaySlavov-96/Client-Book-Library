import { createContext, useContext, useEffect } from "react";

import { SocketService } from '../services';

const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    useEffect(() => {
        SocketService.connect();

        const result = (data) => {
            console.log(data);
        }

        SocketService.subscribeToEvent('message', result);

        return () => {
            SocketService.unsubscribeFromEvent('message', () => console.log(';222'))
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