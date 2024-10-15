import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader } from "../../../component/atoms";

import { useStoreZ } from "../../../hooks";

import { ESendEvents } from "../../../Constants";

import { useAuthContext } from "../../../contexts/AuthContext";

import { SocketService } from "../../../services";

import style from './_UserQueue.module.css';

interface IUserQueueProps {
    onPress: Dispatch<SetStateAction<boolean>>
}

const _UserQueue: FC<IUserQueueProps> = (props) => {
    const { onPress } = props;

    const { users } = useStoreZ();
    const { connectId } = useAuthContext();

    const onAcceptUser = useCallback((userConnectId: string) => {
        SocketService.sendData(ESendEvents.SUPPORT_ACCEPT_USER, {supportId: connectId ,acceptUserId: userConnectId});
    }, [connectId])

    const onClose = useCallback(() => {
        onPress(s => !s);
    }, [onPress]);

    return (
        <>
            <ChatHeader>
                <p className={style['p-style']}>{'Support Chat'}</p>
                <button onClick={onClose}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                <>
                    {users.map(u => {
                        return (
                            <button onClick={() => onAcceptUser(u.connectId)}>
                                {u.connectId}
                            </button>
                        )
                    })}
                </>
            </div>
        </>
    );
}

export default memo(_UserQueue);