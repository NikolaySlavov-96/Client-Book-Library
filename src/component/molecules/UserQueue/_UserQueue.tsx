import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader } from "../../../component/atoms";

import { useStoreZ } from "../../../hooks";

import { SocketService } from "../../../services";

import style from './_UserQueue.module.css';
import { ESendEvents } from "~/Constants";

interface IUserQueueProps {
    onPress: Dispatch<SetStateAction<boolean>>
}
const _UserQueue: FC<IUserQueueProps> = (props) => {
    const { onPress } = props;

    const { users } = useStoreZ();

    const onAcceptUser = useCallback((data: any) => {
        console.log(data)
        // SocketService.sendData(ESendEvents.SUPPORT_ACCEPT_USER, {supportId: data. ,acceptUserId: data.});
    }, [])

    const onClose = useCallback(() => {
        onPress(s => !s);
    }, []);

    return (
        <>
            <ChatHeader>
                <p className={style['p-style']}>{'Support Chat'}</p>
                <button onClick={onClose}>{'X'}</button>
            </ChatHeader>
            <div className={style['chat__container']}>
                <>
                    {users.map(u => {
                        // console.log("🚀 ~ u:", u.userQueue.map(f => console.log(f.connectId, f.status, f.role)))
                        return (
                            <button onClick={() => onAcceptUser(u)}>
                                {u.newUserSocketId}
                            </button>
                        )
                    })}
                </>
            </div>
        </>
    );
}

export default memo(_UserQueue);