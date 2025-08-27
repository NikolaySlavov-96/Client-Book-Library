import { FC, memo, ReactNode } from 'react';

import { LinkedParagraph } from '../../molecules';

import style from './_Footer.module.css';

const FOOTED_CONTENT = {
    LINK: 'https://nnsn.pro',
    BUTTON_LABEL: 'NNSN',
    CONTENT: 'Designed and Implement from '
}

interface IFooterProps {
    children: ReactNode
}

const _Footer: FC<IFooterProps> = () => {
    return (
        <footer className={`global__bg-radius ${style['footer_container']}`}>
            <div className={`${style['div']}`}>
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