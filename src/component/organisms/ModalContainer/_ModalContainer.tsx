import { memo, type ComponentType } from "react";

import { NewProductModal, SearchModal } from "../../molecules";

import { MODAL_NAMES } from "../../../constants";

import { useStoreZ } from "../../../hooks";

const components: Record<string, ComponentType> = {
    [MODAL_NAMES.NEW_PRODUCT]: NewProductModal,
    [MODAL_NAMES.SEARCH]: SearchModal,
};

const _ModalContainer = () => {
    const { modalName } = useStoreZ();

    if (!modalName) {
        return null;
    }

    const RenderModal = components[modalName];
    if (!RenderModal) {
        return null;
    }

    return <RenderModal />;
};

export default memo(_ModalContainer);
