const createModalSlicer = (set) => ({
    modalName: '',
    setModalName: (data) => set({ modalName: data }),
    content: [],
    setContent: (newDate) => set(state => ({
        content: [...state.content, newDate],
    })),
    isVisible: false,
    openModal: () => set({ isVisible: true }),
    closeModal: () => set({ isVisible: false }),
});

export default createModalSlicer;