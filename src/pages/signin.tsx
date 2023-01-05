import React from 'react'

import SignInForm from '../component/ui/forms/signin'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function SignInPage (): JSX.Element {
    return (
        <AuthContext.Consumer>
            {({ isLogged }) => (
                <>
                    {isLogged && <Navigate to='/dashboard'/>}
                    <Container fluid={true} style={{ paddingTop: '7em' }}>
                        <SignInForm color="teal"/>
                    </Container>
                </>
            )}
        </AuthContext.Consumer>
    )
}

export default SignInPage
