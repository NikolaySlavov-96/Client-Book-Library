import { memo } from "react"

import { IMessage } from "../../../Store/Slicers/SupportSlicer";

import { convertDateTime } from "../../..//Helpers";

import style from './_MessageLine.module.css';

interface IMessageLine extends IMessage {
    connectId: string;
};

const _MessageLine = (props: IMessageLine) => {
    const { message, senderId, connectId, createdAt } = props;

    const currentTime = convertDateTime(createdAt);

    const isSender = senderId === connectId;

    if (!senderId) {
        return (<p className={style['message__center']}>{message}</p>)
    }

    return (
        <div className={style['container']}>
            <div className={`${style['content__container']} ${isSender ? style['message__owner'] : ''}`}>
                <p className={style['message']}>{message}</p>
                <p>{currentTime}</p>
            </div>
        </div>
    );
}

export default memo(_MessageLine);