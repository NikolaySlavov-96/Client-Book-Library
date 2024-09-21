import { memo } from 'react';

import { LinkedParagraph } from '../../molecules';

import style from './_Footer.module.css';

const FOOTED_CONTENT = {
    LINK: 'https://slavo-v.dev',
    BUTTON_LABEL: 'Slavo-v',
    CONTENT: 'Designed and Implement from '
}

const _Footer = () => {
    return (
        <footer className={`global__bg-radius ${style['footer_container']}`}>
            <div className={`'shadow' ${style['div']}`}>
                <LinkedParagraph
                    staticContent={FOOTED_CONTENT.CONTENT}
                    to={FOOTED_CONTENT.LINK}
                    pressContent={FOOTED_CONTENT.BUTTON_LABEL}
                />
            </div>
        </footer>
    );
}

export default memo(_Footer);