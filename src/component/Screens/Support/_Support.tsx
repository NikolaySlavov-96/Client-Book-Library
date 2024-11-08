import { memo, useCallback, useEffect } from 'react'

import { ChatHeader } from '../../../component/atoms';

import { useStoreZ } from '../../../hooks';

import { ESendEvents } from '../../../Constants';
import { useAuthContext } from '../../../contexts/AuthContext';

import { SocketService } from '../../../services';

import style from './_Support.module.css';

const DEFAULT_TITLE = 'Support Chat - ';

const _Support = () => {
    const { rooms, connectId, users, messages, selectedRoom, setSelectedRoom } = useStoreZ();
    const { email } = useAuthContext();

    const onAcceptUser = useCallback((userConnectId: string) => {
        SocketService.sendData(ESendEvents.SUPPORT_ACCEPT_USER, { supportId: connectId, acceptUserId: userConnectId });
    }, [connectId])

    useEffect(() => {
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
    }, [connectId]);

    return (
        <section className={style.container}>
            <div className={`shadow__window ${style['chat__container']}`}>
                <ChatHeader>
                    <p className={style['p-style']}>{`${DEFAULT_TITLE}${email.split('@')[0]}`}</p>
                </ChatHeader>
                <div className={style['list-chat__container']}>
                    <>
                        {users.map(u => {
                            return (
                                <button
                                    key={u.connectId}
                                    onClick={() => onAcceptUser(u.connectId)}>
                                    {u.connectId}
                                </button>
                            )
                        })}
                    </>
                </div>
            </div>
            <div className={style['room__container']}>
                <div className={style['room__header']}>
                    {
                        rooms.map(r =>
                            <button
                                onClick={() => setSelectedRoom(r.roomName)}
                                style={{ display: 'inline-block', marginRight: 10, }}
                                key={r.roomName}>
                                {r.roomName.slice(0, 5)}</button>
                        )
                    }
                </div>
                <div className={style['chat__window']}>
                    <>
                        {selectedRoom !== '' ? messages[selectedRoom].map(m => <p key={m.message}>{m.message}</p>) : null}
                    </>
                </div>
            </div>
        </section>
    )
}

export default memo(_Support);