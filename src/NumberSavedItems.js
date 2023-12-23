import { createContext, useState } from "react";

export const numberSavedItemContext = createContext(null)
export const setNumberSavedItemContext = createContext(null)

export const savedItemNumberProvider = ({children})=>{
    const [savedItemsNum , setSavedItemsNum] = useState(0)
    return(
        <numberSavedItemContext.Provider value={savedItemsNum}>
            <setNumberSavedItemContext.Provider value={setSavedItemsNum}>
                {children}
            </setNumberSavedItemContext.Provider>
        </numberSavedItemContext.Provider>

    )

}
