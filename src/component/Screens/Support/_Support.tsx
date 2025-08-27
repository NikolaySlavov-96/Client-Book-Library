import { memo, useCallback, useEffect, useRef } from 'react'

import { ChatHeader, List, MessageForm, MessageLine } from '../../../component/atoms';

import { useStoreZ } from '../../../hooks';

import { ESendEvents } from '../../../constants2';
import { useAuthContext } from '../../../contexts/AuthContext';

import { IMessage, IRoom, IUserQueue } from '../../../Store/Slicers/SupportSlicer';

import { SocketService } from '../../../services';

import style from './_Support.module.css';

const DEFAULT_TITLE = 'Support Chat - ';

const keyExtractorUser = (item: IUserQueue) => item.connectId.toString();
const keyExtractorRoom = (item: IRoom) => item.roomName.toString();
const keyExtractorMessage = (item: IMessage) => item.message.toString();


const _Support = () => {
    const { rooms, connectId, users, messages, selectedRoom, setSelectedRoom } = useStoreZ();
    const { email } = useAuthContext();

    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const currentRoomMessages = messages[selectedRoom] || [];

    const renderItemUser = useCallback(({ item, }: { item: IUserQueue }) => {
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

    const renderItemRoom = useCallback(({ item, }: { item: IRoom }) => {
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

    const renderItemMessage = useCallback(({ item, }: { item: IMessage }) => {
        return (<MessageLine {...item} connectId={connectId} />);
    }, [connectId]);

    useEffect(() => {
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
    }, [connectId]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (selectedRoom) {
            scrollToBottom();
        }
    }, [selectedRoom, currentRoomMessages.length]);

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
                <div className={style['message__container']}>
                    <List
                        data={currentRoomMessages}
                        renderItem={renderItemMessage}
                        keyExtractor={keyExtractorMessage}
                        EmptyComponent={() => null}
                        style={style['chat__window']}
                    />
                    <div ref={messageEndRef} />
                </div>

                {selectedRoom !== '' ? <MessageForm roomName={selectedRoom} connectId={connectId} /> : null}
            </div>
        </section>
    )
}

export default memo(_Support);