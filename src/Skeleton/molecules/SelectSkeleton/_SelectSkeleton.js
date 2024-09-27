import { memo } from "react";
import { ViewElement } from '../../atoms';

const _SelectSkeleton = () => {
    return (
        <div>
            <ViewElement width={300} height={40} />
        </div >
    );
};

export default memo(_SelectSkeleton);