import React from 'react'

import SignUpForm from '../component/ui/forms/signup'
import { Container } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function SignupPage (): JSX.Element {
    return (
        <AuthContext.Consumer>
            {({ isLogged }) => (
                <>
                    {isLogged && <Navigate to='/dashboard'/>}
                    <Container fluid={true} style={{ paddingTop: '7em' }}>
                        <SignUpForm color="teal"/>
                    </Container>
                </>
            )}
        </AuthContext.Consumer>
    )
}

export default SignupPage
