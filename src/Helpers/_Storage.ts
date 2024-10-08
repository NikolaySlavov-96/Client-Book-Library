export const getDataFromStorage = (key: string) => {
    const persist = localStorage.getItem(key);

    if (persist) {
        const persistState = JSON.parse(persist);
        return persistState;
    }
};