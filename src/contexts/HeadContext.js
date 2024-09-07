import { createContext, useContext, useState } from "react";


const HeadContext = createContext();

export const HeadProvider = ({ children }) => {
    const [title, setTitle] = useState('Home');

    const contextValue = {
        title,
        setTitle,
    }

    return (
        <HeadContext.Provider value={contextValue}>
            {children}
        </HeadContext.Provider >
    )
}


export const useHeadContext = () => {
    const context = useContext(HeadContext);
    return context;
}