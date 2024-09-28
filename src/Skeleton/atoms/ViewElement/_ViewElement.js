import { memo, useMemo } from "react";

import style from './_ViewElement.module.css';

const DEFAULT_BORDER_RADIUS = 10;

const _ViewElement = (props) => {
    const {
        borderRadius = DEFAULT_BORDER_RADIUS,
        height,
        width,
    } = props;

    const containerStyle = useMemo(() => ({ width, height, borderRadius }), [width, height, borderRadius])

    return (
        <div className={style['container']} style={containerStyle}>
            <div className={style['skeleton']}></div>
        </div>
    );

};

export default memo(_ViewElement);