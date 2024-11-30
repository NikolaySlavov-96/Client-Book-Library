import { memo } from "react";

import { NewProductModal } from "../../molecules";

import { MODAL_NAMES } from "../../../Constants";

import { useStoreZ } from "../../../hooks";

const components = {
    [MODAL_NAMES.NEW_PRODUCT]: NewProductModal,
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