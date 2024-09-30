import { useState } from "react"


const _useLocalStorage = (key: string, initialValue: {}) => {
    const [state, setState] = useState(() => {
        const persist = localStorage.getItem(key);

        if (persist) {
            const persistState = JSON.parse(persist);
            return persistState;
        }
        return initialValue;
    });

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