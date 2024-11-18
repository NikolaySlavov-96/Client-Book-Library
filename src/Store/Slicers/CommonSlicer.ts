import { StateCreator } from "zustand";

export interface ICommonSlicer {
    pageLimit: number;
    setPageLimit: (limit: number) => void;
    connectId: string,
    setConnectId: (id: string) => void;
}

const createCommonSlicer: StateCreator<ICommonSlicer> = (set) => ({
    pageLimit: 12,
    setPageLimit: (limit) => set({ pageLimit: limit }),

    connectId: '',
    setConnectId: (id) => set({ connectId: id }),
});

export default createCommonSlicer;