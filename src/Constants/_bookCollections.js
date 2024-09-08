const BOOK_COLLECTION = {
    BOOK: 0,
    FOR_PURCHASE: 1,
    PURCHASE: 2,
    FOR_READING: 3,
    READING: 4,
    LISTENING: 5,
};

export default BOOK_COLLECTION;


export const _ARRAY_WITH_BOOK_COLLECTIONS = [
    {
        label: "Adding in For Purchase",
        value: BOOK_COLLECTION.FOR_PURCHASE,
    },
    {
        label: "Adding in Purchase",
        value: BOOK_COLLECTION.PURCHASE,
    },
    {
        label: "Adding in For Reading",
        value: BOOK_COLLECTION.FOR_READING,
    },
    {
        label: "Adding in Reading",
        value: BOOK_COLLECTION.READING,
    },
    {
        label: "Adding in Listening",
        value: BOOK_COLLECTION.LISTENING,
    },
];
