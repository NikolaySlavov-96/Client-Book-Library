import { StateCreator } from "zustand";

export interface ICommonSlicer {
    connectId: string,
    setConnectId: (id: string) => void;
}

const createCommonSlicer: StateCreator<ICommonSlicer> = (set) => ({
    connectId: '',
    setConnectId: (id) => set({ connectId: id }),
});

export default createCommonSlicer;