import { memo } from "react";

import { NewBookModal } from "../../molecules";
import { useStoreZ } from "../../../hooks";

const components = {
    NewBook: NewBookModal,
}

const _ModalContainer = () => {
    const { modalName } = useStoreZ();

    if (modalName === '') {
        return null
    }

    const RenderModal = components[modalName];
    return (
        <RenderModal />
    )
};

export default memo(_ModalContainer);