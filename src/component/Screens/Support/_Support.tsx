import { memo, useCallback, useEffect, useMemo } from 'react'

import { ChatHeader } from '../../../component/atoms';
import { SupportChat } from '../../../component/organisms';

import { useStoreZ } from '../../../hooks';

import { ESendEvents } from '../../../Constants';
import { useAuthContext } from '../../../contexts/AuthContext';

import { SocketService } from '../../../services';

import style from './_Support.module.css';

const DEFAULT_TITLE = 'Support Chat - ';

const _Support = () => {
    const { rooms, connectId, users } = useStoreZ();
    const { email } = useAuthContext();

    const containerStyle = useMemo(() => (
        `shadow__window ${style['container']}`
    ), []);

    const onAcceptUser = useCallback((userConnectId: string) => {
        SocketService.sendData(ESendEvents.SUPPORT_ACCEPT_USER, { supportId: connectId, acceptUserId: userConnectId });
    }, [connectId])

    useEffect(() => {
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
    }, [connectId]);

    return (
        <>
            <div className={containerStyle}>
                <ChatHeader>
                    <p className={style['p-style']}>{`${DEFAULT_TITLE}${email.split('@')[0]}`}</p>
                </ChatHeader>
                <div className={style['chat__container']}>
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
            {
                rooms.map(r => <SupportChat key={r.roomName} roomName={r.roomName} />)
            }
        </>
    )
}

export default memo(_Support);