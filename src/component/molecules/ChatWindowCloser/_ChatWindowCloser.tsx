import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

import { ChatHeader } from "../../../component/atoms";

import style from './_ChatWindowCloser.module.css';

interface IChatWindowCloserProps {
    onPress: Dispatch<SetStateAction<boolean>>
}
const _ChatWindowCloser: FC<IChatWindowCloserProps> = (props) => {
    const { onPress } = props;

    const onClick = useCallback(() => onPress(s => !s), [onPress]);
    return (
        <button className={style['btn']} onClick={onClick}>
            <ChatHeader>
                <>{'Press if you need help'}</>
            </ChatHeader>
        </button>
    );
}

export default memo(_ChatWindowCloser);