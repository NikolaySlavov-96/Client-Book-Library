import { FC, memo, useMemo, useState } from 'react'

import { ChatWindowCloser, ChatWithSupport } from '../../molecules';

import style from './_CustomerSupportChat.module.css';

interface ISupportChatProps {
    roomName: string;
}

const _SupportChat: FC<ISupportChatProps> = (props) => {
    const { roomName } = props;

    const [isOpenChat, setIsOpenChat] = useState(false);

    const containerStyle = useMemo(() => (
        `shadow__window ${style['container']} ${isOpenChat ? style['border__open'] : ''}`
    ), [isOpenChat]);

    return (
        <div className={containerStyle}>
            {isOpenChat ?
                <ChatWithSupport
                    onPress={setIsOpenChat}
                    roomName={roomName}
                />
                :
                <ChatWindowCloser
                    onPress={setIsOpenChat}
                />}
        </div>
    )
}

export default memo(_SupportChat);