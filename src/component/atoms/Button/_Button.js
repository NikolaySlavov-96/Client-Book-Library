import React, { memo } from 'react'

const _Button = (props) => {
    const { styles, onClick, content } = props;

    return (
        <button className={styles} onClick={onClick}>{content}</button>
    )
}

export default memo(_Button);