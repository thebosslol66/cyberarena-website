import React, { useState } from 'react'
import TokenService from '../services/token.service'

interface AuthContextInterface {
    isLogged: boolean
    setIsLogged: (arg0: boolean) => void

}

const AuthContext = React.createContext<AuthContextInterface>({
    isLogged: false,
    setIsLogged: () => {
    }
})

const AuthProvider = ({ children }: any): JSX.Element => {
    const [isLogged, setIsLogged] = useState(false)

    useState(() => {
        TokenService.registerLoginHandler(setIsLogged)
    })

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

export type { AuthContextInterface }

export { AuthProvider }
export default AuthContext
