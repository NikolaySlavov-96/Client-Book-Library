import { memo } from 'react';
import { Link } from 'react-router-dom';

import style from './_LinkedParagraph.module.css';

const _LinkedParagraph = (props) => {
    const { styles, staticContent, to, pressContent } = props;
    
    return (
        <p
            className={`${style["paragraph"]} ${!!styles ? styles : ''}`}
        >
            {staticContent}
            <Link to={to}>{pressContent}</Link>
        </p>
    );
};

export default memo(_LinkedParagraph);