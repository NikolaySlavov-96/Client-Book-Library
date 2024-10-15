import { StateCreator } from "zustand";


export interface IUserQueue {
    connectId: string;

    currentSocketId: string;

    role: 'user' | 'support'

    status: "waiting"
}

export interface SupportSlicer {
    users: IUserQueue[];
    setUsers: (newData: IUserQueue) => void;
}

const createSupportSlicer: StateCreator<SupportSlicer> = (set) => ({
    users: [],
    setUsers: (newUser) => set(state => ({
        users: [...state.users, newUser],
    })),
});

export default createSupportSlicer;