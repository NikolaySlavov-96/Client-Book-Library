import { StateCreator } from "zustand";
import { STORAGE_KEYS } from "../../Constants";

export interface ICommonSlicer {
    connectId: string,
    setConnectId: (id: string) => void;
    unId: string;
    setUnId: ({ unId }: { unId: string }) => void;
}

const createCommonSlicer: StateCreator<ICommonSlicer> = (set) => ({
    connectId: '',
    setConnectId: (id) => set({ connectId: id }),
    unId: '',
    setUnId: ({ unId }) => {
        localStorage.setItem(STORAGE_KEYS.UN_ID, JSON.stringify(unId));
        set({ unId });
    }
});

export default createCommonSlicer;