
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import AuthContext from '../context/AuthContext'

const RequireLoginRoutes = (): JSX.Element => {
    return (
        <AuthContext.Consumer>
            {({ isLogged }) => (
                <>
                    { isLogged && <Outlet/> }
                    { !isLogged && <Navigate to='/signin'/>}
                </>
            )}
        </AuthContext.Consumer>
    )
}

export default RequireLoginRoutes
