import React, { useEffect, useState } from 'react'
import AuthService from '../services/auth.service'
import { Tokens } from '../services/Interfaces/sign'

interface AuthContextInterface {
    isLogged: boolean
    setIsLogged: (arg0: boolean) => void
}

const AuthContext = React.createContext<AuthContextInterface>({
    isLogged: false,
    setIsLogged: () => {}
})

const AuthProvider = ({ children }: any): JSX.Element => {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const user: Tokens | null = AuthService.getCurrentUser()
        if (user !== null) {
            setIsLogged(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

export type { AuthContextInterface }

export { AuthProvider }
export default AuthContext
