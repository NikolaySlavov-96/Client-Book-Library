import { StateCreator } from "zustand";

export interface ModalSlicer {
    modalName: string;
    setModalName: (data: string) => void;
    content: any[]; // TODO
    setContent: (newData: any) => void;
    error: {};
    setErrors: (newData: any) => void;
    isVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const createModalSlicer: StateCreator<ModalSlicer> = (set) => ({
    modalName: '',
    setModalName: (data) => set({ modalName: data }),
    content: [],
    setContent: (newDate) => set(state => ({
        content: [...state.content, newDate],
    })),
    error: {},
    setErrors: (error) => set({ error, }),
    isVisible: false,
    openModal: () => set({ isVisible: true }),
    closeModal: () => set({ isVisible: false }),
});

export default createModalSlicer;