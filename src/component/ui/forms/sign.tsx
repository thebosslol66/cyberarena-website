import React from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'

import { SignInterface, defaultSignValues } from '../../Interfaces/sign'
import SignInForm from './signin'
import SignUpForm from './signup'

function SignForms (signValue: SignInterface): JSX.Element {
    signValue = { ...defaultSignValues, ...signValue }
    signValue.signInAndUpSamePage = true
    return (
        <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <SignInForm {...signValue}/>
                </Grid.Column>
                <Grid.Column>
                    <SignUpForm {...signValue}/>
                </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
        </Segment>
    )
}

export default SignForms
