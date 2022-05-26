import { createContext, useState } from "react";

const PWAContext = createContext()

export const PWAContextProvider = ({children})=>{
    const [destination,setDestination] = useState({})

    return(
        <PWAContext.Provider value={{
            destination,
            setDestination
        }}>
            {children}
        </PWAContext.Provider>
    )
}

export default PWAContext
