import { FC, memo, ReactNode } from "react";

import style from './_ChatHeader.module.css';

interface IChatHeaderProps {
    children: ReactNode;
};

const _ChatHeader: FC<IChatHeaderProps> = (props) => {
    const { children } = props;

    return (
        <div className={style['container']}>
            {children}
        </div>
    )
};

export default memo(_ChatHeader);