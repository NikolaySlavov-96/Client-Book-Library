import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader, InputForm } from "../../../component/atoms";

import { SocketService } from "../../../services";

import { ESendEvents } from "../../../Constants";

import { useAuthContext } from "../../../contexts/AuthContext";

import { useForm } from "../../../hooks";

import style from './_ChatWithSupport.module.css';

const DEFAULT_TITLE = 'Support Chat';
const BUTTON_LABEL = 'Send';

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
                <button onClick={onClose}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                {'Messages'}
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