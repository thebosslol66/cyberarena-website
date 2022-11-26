import React from 'react'

import SignUpForm from '../component/ui/forms/signup'
import { Container } from 'semantic-ui-react'

function SignupPage (): JSX.Element {
    return (

        <Container fluid={true} style={{ marginTop: '7em' }}>
            <SignUpForm color="teal"/>
        </Container>
    )
}

export default SignupPage
