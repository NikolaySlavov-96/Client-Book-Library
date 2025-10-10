import { useState } from "react";
import { TViewType } from "~/Types/Components";


const _useViewType = (inViewType?: TViewType) => {
    const [viewType, setViewType] = useState<TViewType>(inViewType ?? 'list');

    const onChangeViewType = (viewTypeParam: TViewType) => {
        setViewType(viewTypeParam);
    }

    return {
        viewType,
        onChangeViewType,
    };
};

export default _useViewType;