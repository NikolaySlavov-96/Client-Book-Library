import { useCallback, useEffect } from "react";

import { SocketService } from '../services';

import { EReceiveEvents, ESendEvents, MODAL_NAMES } from '../Constants';

import { useGetUserAddress, useStoreZ } from "../hooks";

import { useAuthContext } from "../contexts/AuthContext";

import { IRoom, IUserQueue } from "../Store/Slicers/SupportSlicer";

export interface INotifyAdminOfNewUser {
    newUserSocketId: string;
    userQueue: IUserQueue[];
}

const onUnsubscribe = () => {
    console.log('Unsubscribe')
}

const _Socket = () => {
    const { connectId, userRole, addedConnectId } = useAuthContext();

    const { openModal, setModalName, setContent, setUsers, setRooms } = useStoreZ();

    const userAddressData = useGetUserAddress();

    const result = useCallback((data: any) => {
        setModalName(MODAL_NAMES.NEW_BOOK);
        setContent(data);
        openModal();
    }, [setModalName, setContent, openModal]);

    const updateCountOfVisitors = (data: any) => {
        console.log(data)
    }

    const saveConnectId = (data: { connectId: string; message: string }) => {
        console.log("🚀 ~ saveConnectId ~ data:", data)
        if (!connectId) {
            addedConnectId(data.connectId)
        }
        // Attach support message.
    }

    const notifyForCreatedRoom = (data: IRoom) => {
        setRooms(data);
        if (userRole !== 'support') {
            SocketService.sendData(ESendEvents.USER_ACCEPT_JOIN_TO_ROOM, { roomName: data.roomName })
        }
    }

    const notifyAdmin = (data: INotifyAdminOfNewUser) => {
        setUsers(data.userQueue);
    };

    const supportMessage = (data: any) => {
        console.log('supportMessage', data)
    }

    useEffect(() => {
        SocketService.connect();

        SocketService.subscribeToEvent(EReceiveEvents.NEW_BOOK_ADDED, result);
        SocketService.subscribeToEvent(EReceiveEvents.USER_JOINED, updateCountOfVisitors);
        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT, saveConnectId);

        SocketService.subscribeToEvent(EReceiveEvents.NOTIFY_FOR_CREATE_ROOM, notifyForCreatedRoom);
        SocketService.subscribeToEvent(EReceiveEvents.NOTIFY_ADMINS_OF_NEW_USER, notifyAdmin);

        SocketService.subscribeToEvent(EReceiveEvents.SUPPORT_MESSAGE, supportMessage);

        return () => {
            SocketService.unsubscribeFromEvent(EReceiveEvents.NEW_BOOK_ADDED, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.USER_JOINED, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.NOTIFY_FOR_CREATE_ROOM, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.NOTIFY_ADMINS_OF_NEW_USER, onUnsubscribe);
            SocketService.unsubscribeFromEvent(EReceiveEvents.SUPPORT_MESSAGE, onUnsubscribe);
            SocketService.disconnect();
        }
    }, []);

    useEffect(() => {
        if (userAddressData.hasOwnProperty('IPv4')) {
            SocketService.sendData(ESendEvents.USER_JOINED, userAddressData);
        }
    }, [userAddressData]);
};

export default _Socket;