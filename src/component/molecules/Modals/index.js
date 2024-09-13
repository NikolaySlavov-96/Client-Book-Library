import NewBookModal from './NewBookModal/_NewBookModal';

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

export default _ModalContainer;