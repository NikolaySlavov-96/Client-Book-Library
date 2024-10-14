import { memo, useEffect, useMemo, useState } from 'react'

import { ChatWindowCloser, ChatWithSupport } from '../../../component/molecules';

import { useAuthContext } from '../../../contexts/AuthContext';

import { SocketService } from '../../../services';

import { ESendEvents } from '../../../Constants';

import style from './_CustomerSupportChat.module.css';

const _CustomerSupportChat = () => {
    const [isOpenChat, setIsOpenChat] = useState(false);

    const { connectId } = useAuthContext();

    const containerStyle = useMemo(() => (
        `shadow__window ${style['container']} ${isOpenChat ? style['border__open'] : ''}`
    ), [isOpenChat]);

    useEffect(() => {
        if (isOpenChat) {
            if (connectId) {
                SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_JOIN, { connectId, });
            } else {
                SocketService.sendOnlySignal(ESendEvents.SUPPORT_CHAT_USER_JOIN);
            }
        }
    }, [connectId, isOpenChat]);
    
    return (
        <div className={containerStyle}>
            {isOpenChat ?
                <ChatWithSupport onPress={setIsOpenChat} />
                :
                <ChatWindowCloser onPress={setIsOpenChat} />}
        </div>
    )
}

export default memo(_CustomerSupportChat);