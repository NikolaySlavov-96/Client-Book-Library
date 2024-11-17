import { memo, useCallback, useEffect } from 'react'

import { ChatHeader, List } from '../../../component/atoms';

import { useStoreZ } from '../../../hooks';

import { ESendEvents } from '../../../Constants';
import { useAuthContext } from '../../../contexts/AuthContext';

import { SocketService } from '../../../services';

import style from './_Support.module.css';

const DEFAULT_TITLE = 'Support Chat - ';

const keyExtractorUser = (item: any) => item.connectId.toString();
const keyExtractorRoom = (item: any) => item.roomName.toString();
const keyExtractorMessage = (item: any) => item.roomName.toString();


const _Support = () => {
    const { rooms, connectId, users, messages, selectedRoom, setSelectedRoom } = useStoreZ();
    const { email } = useAuthContext();

    const currentRoomMessages = messages[selectedRoom] || [];

    const renderItemUser = useCallback(({ item, }: { item: any }) => {
        const onClick = () => {
            SocketService.sendData(ESendEvents.SUPPORT_ACCEPT_USER, { supportId: connectId, acceptUserId: item.connectId });
        };

        return (
            <button
                onClick={onClick}>
                {item.connectId}
            </button>
        )
    }, [connectId]);

    const renderItemRoom = useCallback(({ item, }: { item: any }) => {
        const onClick = () => {
            setSelectedRoom(item.roomName)
        };

        return (
            <button
                onClick={onClick}
                style={{ display: 'inline-block', marginRight: 10, }}>
                {item.roomName.slice(0, 5)}
            </button>
        )
    }, [setSelectedRoom]);

    const renderItemMessage = useCallback(({ item, }: { item: any }) => {
        const onClick = () => {
            setSelectedRoom(item.roomName)
        };

        return (
            <button
                onClick={onClick}
                style={{ display: 'inline-block', marginRight: 10, }}>
                {item.roomName.slice(0, 5)}
            </button>
        )
    }, [setSelectedRoom]);

    useEffect(() => {
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
    }, [connectId]);

    return (
        <section className={style.container}>
            <div className={`shadow__window ${style['chat__container']}`}>
                <ChatHeader>
                    <p>{`${DEFAULT_TITLE}${email.split('@')[0]}`}</p>
                </ChatHeader>
                <List
                    data={users}
                    renderItem={renderItemUser}
                    keyExtractor={keyExtractorUser}
                    style={style['list-chat__container']}
                />
            </div>
            <div className={style['room__container']}>
                <List
                    data={rooms}
                    renderItem={renderItemRoom}
                    keyExtractor={keyExtractorRoom}
                    style={style['room__header']}
                />
                <List
                    data={currentRoomMessages}
                    renderItem={renderItemMessage}
                    keyExtractor={keyExtractorMessage}
                    EmptyComponent={() => null}
                    style={style['chat__window']}
                />
            </div>
        </section>
    )
}

export default memo(_Support);