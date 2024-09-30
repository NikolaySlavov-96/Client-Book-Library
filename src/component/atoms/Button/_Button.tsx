import { FC, memo } from 'react'

interface IButtonProps {
    content: number | string;
    onClick: () => void;
    styles: string;
}

const _Button: FC<IButtonProps> = (props) => {
    const { styles, onClick, content } = props;

    return (
        <button className={styles} onClick={onClick}>{content}</button>
    )
}

export default memo(_Button);