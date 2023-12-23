import axios from "axios";
import { createContext, useState } from "react";
import { GET_SAVED_ITEMS_FOR_USER } from "./infra/urls";

export const savedItemsContext = createContext(null)
export const setSavedItemsContext = createContext(null)
export const SavedItemsFunctionContext = createContext(null)


export const SavedItemsProvider = ({children})=>{
    const [savedItems, setSavedItems] = useState({results:[]})
    const refreshSavedItems = async ()=>{
        const savedItemsResponse = await axios.get(GET_SAVED_ITEMS_FOR_USER)
        setSavedItems(savedItemsResponse.data)
    }
    return(
        <SavedItemsFunctionContext.Provider value={refreshSavedItems}>
        <setSavedItemsContext.Provider value={setSavedItems} >
        <savedItemsContext.Provider value={savedItems}>
            {children}
        </savedItemsContext.Provider>
        </setSavedItemsContext.Provider>
        </SavedItemsFunctionContext.Provider>
    )
}

