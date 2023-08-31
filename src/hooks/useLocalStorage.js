import { useState } from "react"


export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const persist = localStorage.getItem(key);

        if (persist) {
            const persistState = JSON.parse(persist);
            return persistState;
        }
        return initialValue;
    });

    const setLocalStorage = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    }

    return [
        state,
        setLocalStorage,
    ]
}