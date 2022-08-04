import { useContext} from 'react'


const AppContext = createContext()

function AppProvider({children}) {
    return (
        <AppContext.Provider>
            
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider} 