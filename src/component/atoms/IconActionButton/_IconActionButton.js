import { memo } from "react";

import style from './_IconActionButton.module.css';

const _IconActionButtonModule = (props) => {
    const {
        onClick,
        iconName = 'fas fa-chevron-circle-left'
    } = props;

    return (
        <div className={style['container']}>
            <button
                className={style['btn']}
                onClick={onClick}
            >
                <i className={iconName}></i>
            </button>
        </div>
    )
};

export default memo(_IconActionButtonModule);