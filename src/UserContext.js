import { Children, createContext, useReducer, useState } from "react";

export const UserContext = createContext(null)
export const SetUserContext = createContext(null)


const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        user: null
    })

    return(
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )

}

export default UserProvider