import { StateCreator } from "zustand";

export interface IUserQueue {
    connectId: string;

    currentSocketId: string;

    role: 'user' | 'support'

    status: "waiting"
}

interface IMessage {
    message: string;
}

interface IMessages {
    [key: string]: IMessage[];
}

export interface IRoom {
    roomName: string;
}

export interface SupportSlicer {
    welcomeMessage: string;
    setWelcomeMessage: (message: string) => void;
    users: IUserQueue[];
    setUsers: (newData: IUserQueue[]) => void;
    rooms: IRoom[];
    setRooms: (newRoom: IRoom) => void;
    updateRoom: (roomName: string, newData: IRoom) => void;
    messages: IMessages;
    addMessage: (roomName: string, data: IMessage) => void;
    updateMessageState: (roomName: string, data: IMessage) => void;
}

const createSupportSlicer: StateCreator<SupportSlicer> = (set) => ({
    welcomeMessage: '',
    setWelcomeMessage: (message: string) => set(state => ({
        welcomeMessage: message,
    })),

    users: [],
    setUsers: (newUser) => set(state => ({
        users: newUser,
    })),

    rooms: [],
    setRooms: (newRoom) => set(state => ({
        rooms: [...state.rooms, newRoom],
    })),
    updateRoom: (roomName, newData) => set(state => {
        return {
            rooms: state.rooms.map(r => r.roomName === roomName ? newData : r)
        }
    }),

    messages: {},
    addMessage: (roomName, data) => set((state) => {
        const currentMessages = state.messages[roomName] || [];
        return {
            messages: {
                ...state.messages,
                [roomName]: [...currentMessages, data],
            },
        };
    }),
    updateMessageState: (roomName, newMessageState) => set((state) => {
        const currentMessage = state.messages[roomName] || {};
        return {
            messages: {
                ...state.messages,
                [roomName]: {
                    ...currentMessage,
                    ...newMessageState,
                },
            },
        };
    }),
});

export default createSupportSlicer;