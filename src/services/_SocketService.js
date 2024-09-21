import { io } from "socket.io-client";

import { HOST } from "../Constants/connectionData";

let socket;

const connect = () => {
    socket = io(HOST, {
        path: '/bookHub',
        cors: { origin: '*', },
    });

    socket.on('connect', () => {
        console.log('Socket Connected');
    });

    socket.on('disconnected', () => {
        console.log('Socket Disconnected');
    });
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
    };
};

const subscribeToEvent = (event, callback) => {
    if (socket) {
        socket.on(event, callback);
    };
};

const unsubscribeFromEvent = (event, callback) => {
    if (socket) {
        socket.off(event, callback);
    };
};

const sendData = (event, data) => {
    if (socket) {
        socket.emit(event, data);
    }
}


export {
    connect,
    disconnect,
    subscribeToEvent,
    unsubscribeFromEvent,
    sendData,
};