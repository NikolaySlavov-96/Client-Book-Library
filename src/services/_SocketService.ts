import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

import { HOST } from "../Constants/connectionData";
import { EReceiveEvents, ESendEvents } from '../Constants';
import { useStoreZ } from "../hooks";

let socket: Socket;

const options: Partial<ManagerOptions & SocketOptions> = {
    path: '/bookHub',
}

const connect = () => {
    socket = io(HOST, options);

    socket.on('connect', () => {
        console.log('Socket Connected');
        useStoreZ.getState().setConnectId(socket.id ?? '');
    });

    socket.on('disconnected', () => {
        console.log('Socket Disconnected');
        useStoreZ.getState().setConnectId('');
    });
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
        useStoreZ.getState().setConnectId('');
    };
};

const subscribeToEvent = (event: EReceiveEvents, callback: (data: any) => void) => {
    if (socket) {
        socket.on(event, callback);
    };
};

const unsubscribeFromEvent = (event: EReceiveEvents, callback: () => void) => {
    if (socket) {
        socket.off(event, callback);
    };
};

const sendData = (event: ESendEvents, data: string | object) => {
    if (socket) {
        socket.emit(event, data);
    }
}
const sendOnlySignal = (event: ESendEvents) => {
    if (socket) {
        socket.emit(event);
    }
}


export {
    connect,
    disconnect,
    sendData,
    sendOnlySignal,
    subscribeToEvent,
    unsubscribeFromEvent,
};