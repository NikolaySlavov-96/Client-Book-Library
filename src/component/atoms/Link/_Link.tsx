import { FC, memo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ILinkProps {
    children: ReactNode;
    to: string;
}

const _Link: FC<ILinkProps> = (props) => {
    const { children, } = props;

    return (
        <Link
            {...props}
        >
            {children}
        </Link>
    )
}

export default memo(_Link)