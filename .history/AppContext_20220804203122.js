import { useContext, createContext, useState, useEffect} from 'react'


const AppContext = createContext()

function AppProvider({children}) {
    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider} 