import { useEffect, useState } from "react"

import { useStoreZ } from ".";

import { STORAGE_KEYS } from "../Constants";


const _useLocalStorage = (key: string, initialValue: {}) => {
    const { setConnectId } = useStoreZ();

    const [state, setState] = useState(() => {
        const persist = localStorage.getItem(key);

        if (persist) {
            const persistState = JSON.parse(persist);
            return persistState;
        }
        return initialValue;
    });

    useEffect(() => {
        if (key === STORAGE_KEYS.CONNECT_ID) {
            const persist = localStorage.getItem(key);
            if (persist) {
                const connectId = JSON.parse(persist);
                setConnectId(connectId)
            }
        }
    }, []);

    // const saveToLocalStorage = (value) => {
    //     setData(value);
    //     localStorage.setItem(key, JSON.stringify(value));
    //   };

    const setLocalStorage = (value: any) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    }

    return [
        state,
        setLocalStorage,
    ]
}

export default _useLocalStorage;