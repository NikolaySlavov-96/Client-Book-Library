import { useCallback, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents, ESendEvents, MODAL_NAMES, STORAGE_KEYS } from '../Constants';

import { useGetUserAddress, useStoreZ } from "../hooks";

import { useAuthContext } from "../contexts/AuthContext";

const onUnsubscribe = () => {
    console.log('Unsubscribe')
}

const _Socket = () => {
    const { userRole } = useAuthContext();

    const { setUnId, openModal, setModalName, setContent, setUsers, setRooms, setWelcomeMessage, addMessage } = useStoreZ();

    const userAddressData = useGetUserAddress();

    const result = useCallback((data: any) => {
        setModalName(MODAL_NAMES.NEW_BOOK);
        setContent(data);
        openModal();
    }, [setModalName, setContent, openModal]);

    const updateCountOfVisitors = (data: any) => {
        console.log(data)
    }

    const notifyForCreatedRoom = (data: { roomName: string, message: string }) => {
        setRooms({ roomName: data.roomName });
        addMessage(data);
        if (userRole !== 'support') {
            SocketService.sendData(ESendEvents.USER_ACCEPT_JOIN_TO_ROOM, { roomName: data.roomName })
        }
    }

    useEffect(() => {
        SocketService.connect();

        SocketService.subscribeToEvent(EReceiveEvents.NEW_BOOK_ADDED, result);

        SocketService.subscribeToEvent(EReceiveEvents.USER_JOINED, updateCountOfVisitors);
        SocketService.subscribeToEvent(EReceiveEvents.USER_CONNECT_ACKNOWLEDGMENT, setUnId);

        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT, setWelcomeMessage);

        SocketService.subscribeToEvent(EReceiveEvents.NOTIFY_FOR_CREATE_ROOM, notifyForCreatedRoom);
        SocketService.subscribeToEvent(EReceiveEvents.NOTIFY_ADMINS_OF_NEW_USER, setUsers);

        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_MESSAGE, addMessage);

        return () => {
            SocketService.unsubscribeFromEvent(EReceiveEvents.NEW_BOOK_ADDED, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.USER_CONNECT_ACKNOWLEDGMENT, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.USER_JOINED, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.NOTIFY_FOR_CREATE_ROOM, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.NOTIFY_ADMINS_OF_NEW_USER, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.SUPPORT_MESSAGE, onUnsubscribe);
            SocketService.disconnect();
        }
    }, []);

    useEffect(() => {
        const persist = localStorage.getItem(STORAGE_KEYS.UN_ID);
        if (persist) {
            const unId = JSON.parse(persist);
            setUnId({ unId })
            SocketService.sendData(ESendEvents.USER_CONNECT, { unId })
        }
        else {
            SocketService.sendOnlySignal(ESendEvents.USER_CONNECT);
        }
    }, []);

    useEffect(() => {
        if (userAddressData.hasOwnProperty('IPv4')) {
            SocketService.sendData(ESendEvents.USER_JOINED, userAddressData);
        }
    }, [userAddressData]);
};

export default _Socket;