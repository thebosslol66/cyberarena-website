import React from 'react'

import { Navigate } from 'react-router-dom'
import AuthService from '../services/auth.service'
import AuthContext from '../context/AuthContext'

function SignoutPage (): JSX.Element {
    AuthService.signout()
    const { setIsLogged } = React.useContext(AuthContext)
    setIsLogged(false)
    return (
        <Navigate to='/signin'/>
    )
}

export default SignoutPage
