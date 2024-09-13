import { memo } from "react";

import { NewBookModal } from "../../molecules";

const components = {
    NewBookModal: NewBookModal,
}

const _ModalContainer = () => {
    const modal = 'NewBookModal';

    if(modal === '') {
        return null
    }

    const RenderModal = components[modal];
    return (
        <RenderModal />
    )
};

export default memo(_ModalContainer);