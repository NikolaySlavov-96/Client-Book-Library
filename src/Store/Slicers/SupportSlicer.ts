import { StateCreator } from "zustand";

export interface IUserQueue {
    connectId: string;

    currentSocketId: string;

    role: 'user' | 'support'

    status: "waiting"
}

export interface IRoom {
    roomName: string;
    message: string;
}

export interface SupportSlicer {
    users: IUserQueue[];
    setUsers: (newData: IUserQueue[]) => void;
    rooms: IRoom[];
    setRooms: (newRoom: IRoom)  => void;
}

const createSupportSlicer: StateCreator<SupportSlicer> = (set) => ({
    users: [],
    setUsers: (newUser) => set(state => ({
        users: newUser,
    })),
    rooms: [],
    setRooms: (newRoom) => set(state => ({
        rooms: [...state.rooms, newRoom],
    })),
});

export default createSupportSlicer;