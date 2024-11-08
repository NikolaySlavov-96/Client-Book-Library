import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader, InputForm } from "../../../component/atoms";

import { ToastWithButton } from "../../../Toasts";

import { SocketService } from "../../../services";

import { ESendEvents } from "../../../Constants";

import { useForm, useStoreZ } from "../../../hooks";

import style from './_ChatWithSupport.module.css';

const DEFAULT_TITLE = 'Support Chat';
const BUTTON_LABEL = 'Send';

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

    const onVerifyChoice = async () => {
        const result = await ToastWithButton({
            title: 'Support Chat',
            subContent: 'Are you sure you want to close the chat?',
            isCancelButton: true,
            isConfirmButton: true,
            confirmButtonTitle: 'Ok',
            cancelButtonTitle: 'Cancel'
        });
        
        console.log("🚀 ~ onVerifyChoice ~ result:", result.isConfirmed)
        if (result.isConfirmed) {
            onClose()
        }
    };

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
                <p className={style['p-style']}>{!!roomName ? roomName : DEFAULT_TITLE}</p>
                <button onClick={onVerifyChoice}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                {welcomeMessage}
                <>
                    {roomMessages.map(m => <p>{m.message}</p>)}
                </>
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