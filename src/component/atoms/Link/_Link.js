import { memo } from "react";
import { Link } from "react-router-dom";

const _Link = (props) => {
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