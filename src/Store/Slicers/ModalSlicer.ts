import { StateCreator } from "zustand";

export interface IModalSlicer {
    modalName: string;
    setModalName: (data: string) => void;
    content: any[]; // TODO
    setContent: (newData: any) => void;
    error: { message: string };
    setErrors: (newData: any) => void;
    isVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const createModalSlicer: StateCreator<IModalSlicer> = (set) => ({
    modalName: '',
    setModalName: (data) => set({ modalName: data }),
    content: [],
    setContent: (newDate) => set(state => ({
        content: [...state.content, newDate],
    })),
    error: { message: '' },
    setErrors: (error) => set({ error, }),
    isVisible: false,
    openModal: () => set({ isVisible: true }),
    closeModal: () => set({ isVisible: false }),
});

export default createModalSlicer;