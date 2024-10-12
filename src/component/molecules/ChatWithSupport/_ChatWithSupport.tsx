import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader } from "../../../component/atoms";

import { SocketService } from "../../../services";

import { ESendEvents } from "../../../Constants";

import style from './_ChatWithSupport.module.css';

interface IChatWihSupportProps {
    onPress: Dispatch<SetStateAction<boolean>>
}
const _ChatWithSupport: FC<IChatWihSupportProps> = (props) => {
    const { onPress } = props;

    const onClose = useCallback(() => {
        onPress(s => !s);
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_LEAVE, { roomName: '1e8d68a3-bc52-4604-b608-6e12879fa28e', });
    }, []);

    return (
        <>
            <ChatHeader>
                <p className={style['p-style']}>{'Support Chat'}</p>
                <button onClick={onClose}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                {'Messages'}
            </div>
            <div>
                {'Input for send new message'}
            </div>
        </>
    );
}

export default memo(_ChatWithSupport);