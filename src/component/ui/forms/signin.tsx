
import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { SignInterface, defaultSignValues } from '../../Interfaces/sign'
import AuthService from '../../../services/auth.service'

export default class SignInForm extends React.Component<SignInterface,
{
    username: string
    password: string
    error: string

    isRequestWaiting: boolean
}> {
    static defaultProps = defaultSignValues
    constructor (props: SignInterface) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            isRequestWaiting: false
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        this.setState({ isRequestWaiting: true })
        AuthService.signin(this.state.username, this.state.password).then(() => {
            this.setState({ isRequestWaiting: false })
            this.setState({ error: '' })
            // redirect to dashboard
            window.location.href = '/dashboard'
        })
            .catch((error: any) => {
                this.setState({ isRequestWaiting: false })
                this.setState({ error: error.response.data.detail })
            }) // TODO: Handle connection error
    }

    render (): JSX.Element {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color={this.props.color} textAlign='center'>
                        Sign-in to your account
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            {this.state.error !== '' && <Message negative>
                                <Message.Header>Sign-in error</Message.Header>
                                <p>{this.state.error}</p>
                            </Message>}
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username or E-mail address' onChange={event => this.setState({ username: event.target.value })}/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={event => this.setState({ password: event.target.value })}
                            />
                            <Button color={this.props.color} fluid size='large' loading={this.state.isRequestWaiting}
                                disabled={this.state.isRequestWaiting}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    {(this.props.signInAndUpSamePage === false) && (
                        <Message>
                            Don&lsquo;t have account ? <a href='/signup'>Sign Up</a>
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        )
    }
}
