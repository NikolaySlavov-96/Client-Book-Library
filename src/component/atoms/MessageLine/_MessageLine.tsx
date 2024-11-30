import { memo } from "react"

import { IMessage } from "~/Store/Slicers/SupportSlicer";

import style from './_MessageLine.module.css';

interface IMessageLine extends IMessage {
    connectId: string;
};

const _MessageLine = (props: IMessageLine) => {
    const { message, senderId, connectId } = props;

    const isSender = senderId === connectId;

    if (!senderId) {
        return (<p className={style['message__center']}>{message}</p>)
    }
    return (<p className={isSender ? style['message__owner'] : ''}>{message}</p>)
}

export default memo(_MessageLine);