import React, { memo } from 'react'

const _SectionTitle = (props) => {
    const { styles, content } = props;

    return (
        <h1>{content}</h1>
    )
}

export default memo(_SectionTitle);