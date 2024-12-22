import { Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useRef } from "react";

import { ChatHeader, List, MessageForm, MessageLine } from "../../../component/atoms";

import { ToastWithButton } from "../../../Toasts";

import { SocketService } from "../../../services";

import { ESendEvents } from "../../../Constants";
import { SUPPORT_TOAST } from "../../../Configuration";

import { useStoreZ } from "../../../hooks";

import { IMessage } from "../../../Store/Slicers/SupportSlicer";

import style from './_ChatWithSupport.module.css';

const DEFAULT_TITLE = 'Support Chat';

const keyExtractor = (item: IMessage, index: number) => index.toString();

interface IChatWihSupportProps {
    onPress: Dispatch<SetStateAction<boolean>>
    roomName: string;
}
const _ChatWithSupport: FC<IChatWihSupportProps> = (props) => {
    const { onPress, roomName } = props;

    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const { connectId, welcomeMessage, messages } = useStoreZ();

    const roomMessages = messages[roomName] || [];

    const onClose = useCallback(() => {
        onPress(s => !s);
        SocketService.sendData(ESendEvents.SUPPORT_CHAT_USER_LEAVE, { roomName, connectId, });
    }, [onPress, roomName, connectId]);

    const onVerifyChoice = useCallback(async () => {
        const result = await ToastWithButton(SUPPORT_TOAST);
        if (result?.isConfirmed) {
            onClose()
        }
    }, [onClose]);

    const renderItem = useCallback(({ item }: { item: IMessage }) => {
        return (<MessageLine {...item} connectId={connectId} />);
    }, [connectId]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [roomMessages.length]);

    return (
        <>
            <ChatHeader>
                <p>{!!roomName ? roomName : DEFAULT_TITLE}</p>
                <button onClick={onVerifyChoice}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                <p className={style['welcome__message']}>{welcomeMessage}</p>
                <List
                    data={roomMessages}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
                <div ref={messageEndRef} />
            </div>
            {!!roomName ? (
                <div className={style['input__container']}>
                    <MessageForm roomName={roomName} connectId={connectId} />
                </div>
            ) : null}
        </>
    );
}

export default memo(_ChatWithSupport);