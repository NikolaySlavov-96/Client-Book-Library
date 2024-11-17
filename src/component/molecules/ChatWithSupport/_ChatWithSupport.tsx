import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader, InputForm, List } from "../../../component/atoms";

import { ToastWithButton } from "../../../Toasts";

import { SocketService } from "../../../services";

import { ESendEvents } from "../../../Constants";
import { SUPPORT_TOAST } from "../../../Configuration";

import { useForm, useStoreZ } from "../../../hooks";

import { IMessage } from "../../../Store/Slicers/SupportSlicer";

import style from './_ChatWithSupport.module.css';

const DEFAULT_TITLE = 'Support Chat';
const BUTTON_LABEL = 'Send';

const renderItem = ({ item }: { item: IMessage }) => {
    return (<p>{item?.message}</p>)
}

const keyExtractor = (item: IMessage, index: number) => index.toString();

interface IChatWihSupportProps {
    onPress: Dispatch<SetStateAction<boolean>>
    roomName: string;
}
const _ChatWithSupport: FC<IChatWihSupportProps> = (props) => {
    const { onPress, roomName } = props;

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

    const sendMessage = useCallback((data: { message: string }) => {
        SocketService.sendData(ESendEvents.SUPPORT_MESSAGE, {
            roomName,
            message: data.message,
        })
    }, [roomName]);

    const { values, changeHandler, onSubmit } = useForm({
        message: '',
    }, sendMessage, {
        message: ['required', 1]
    });

    return (
        <>
            <ChatHeader>
                <p>{!!roomName ? roomName : DEFAULT_TITLE}</p>
                <button onClick={onVerifyChoice}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                {welcomeMessage}
                <List
                    data={roomMessages}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </div>
            {!!roomName ? <InputForm
                buttonLabel={BUTTON_LABEL}
                formStyles={style['send__input-button']}
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    name='message'
                    id='message'
                    placeholder={BUTTON_LABEL}
                    value={values.message}
                    onChange={changeHandler}
                    onBlur={changeHandler}
                />
            </InputForm> : null}
        </>
    );
}

export default memo(_ChatWithSupport);