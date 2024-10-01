import { memo } from "react";

import { GlobalErrorModal, NewBookModal } from "../../molecules";

import { MODAL_NAMES } from "../../../Constants";

import { useStoreZ } from "../../../hooks";

const components = {
    [MODAL_NAMES.GLOBAL_ERROR_MODAL]: GlobalErrorModal,
    [MODAL_NAMES.NEW_BOOK]: NewBookModal,
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