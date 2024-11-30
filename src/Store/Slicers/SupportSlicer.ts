import { StateCreator } from "zustand";

export interface IUserQueue {
    connectId: string;

    name: string;
}

interface INotifyAdminOfNewUser {
    newUserSocketId: string;
    userQueue: IUserQueue[];
}

export interface IMessage {
    connectId: string;
    createAt: string;
    message: string;
    roomName: string;
    senderId?: string;
    updatedAt: string;
}

export interface IMessages {
    [key: string]: IMessage[];
}

export interface IRoom {
    roomName: string;
}

export interface ISupportSlicer {
    welcomeMessage: string;
    setWelcomeMessage: ({ message }: { message: string }) => void;
    users: IUserQueue[];
    setUsers: (newData: INotifyAdminOfNewUser) => void;
    selectedRoom: string;
    setSelectedRoom: (room: string) => void;
    rooms: IRoom[];
    setRooms: (newRoom: IRoom) => void;
    updateRoom: (roomName: string, newData: IRoom) => void;
    removeRoom: (roomName: string) => void;
    resetRooms: () => void;
    messages: IMessages;
    addMessage: (data: IMessage) => void;
    updateMessageState: (roomName: string, data: IMessage) => void;
    resetMessages: () => void;
}

const createSupportSlicer: StateCreator<ISupportSlicer> = (set) => ({
    welcomeMessage: '',
    setWelcomeMessage: ({ message }) => set(state => ({
        welcomeMessage: message,
    })),

    users: [],
    setUsers: (newUser) => set(state => ({
        users: newUser.userQueue,
    })),

    selectedRoom: '',
    setSelectedRoom: (room: string) => set({ selectedRoom: room }),

    rooms: [],
    setRooms: (newRoom) => set(state => ({
        rooms: [...state.rooms, newRoom],
    })),
    updateRoom: (roomName, newData) => set(state => {
        return {
            rooms: state.rooms.map(r => r.roomName === roomName ? newData : r)
        }
    }),
    removeRoom: (roomName: string) => set(state => {
        return {
            rooms: state.rooms.filter(r => r.roomName !== roomName)
        }
    }),
    resetRooms: () => set(state => ({
        rooms: [],
    })),

    messages: {},
    addMessage: (data) => set((state) => {
        console.log("🚀 ~ addMessage: ~ data:", data)
        const roomName = data.roomName;
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
    resetMessages: () => set(state => ({
        messages: {},
    })),
});

export default createSupportSlicer;