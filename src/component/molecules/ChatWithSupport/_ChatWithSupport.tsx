import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader } from "../../../component/atoms";

import { SocketService } from "../../../services";

import { ESendEvents } from "../../../Constants";

import { useAuthContext } from "../../../contexts/AuthContext";

import style from './_ChatWithSupport.module.css';

const DEFAULT_TITLE = 'Support Chat';

interface IChatWihSupportProps {
    onPress: Dispatch<SetStateAction<boolean>>
    roomName: string;
}
const _ChatWithSupport: FC<IChatWihSupportProps> = (props) => {
    const { onPress, roomName } = props;

    const { connectId } = useAuthContext();

    const onClose = useCallback(() => {
        onPress(s => !s);
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_LEAVE, { roomName, connectId, });
    }, [onPress, roomName, connectId]);

    const sendMessage = useCallback(() => {
        SocketService.sendData(ESendEvents.SUPPORT_MESSAGE, {
            roomName,
            message: 'Test'
        })
    }, [roomName])

    return (
        <>
            <ChatHeader>
                <p className={style['p-style']}>{!!roomName ? roomName : DEFAULT_TITLE}</p>
                <button onClick={onClose}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                {'Messages'}
            </div>
            <button onClick={sendMessage}>
                {'Input for send a new message'}
            </button>
        </>
    );
}

export default memo(_ChatWithSupport);