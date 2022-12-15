import React, { Context } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { defaultSignValues, SignInterface } from '../../Interfaces/sign'
import AuthService from '../../../services/auth.service'
import { Link, redirect } from 'react-router-dom'
import AuthContext, { AuthContextInterface } from '../../../context/AuthContext'

export default class SignInForm extends React.Component<SignInterface,
{
    username: string
    password: string
    error: string

    isRequestWaiting: boolean
}> {
    static defaultProps = defaultSignValues
    static contextType: Context<AuthContextInterface> = AuthContext

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
        const { setIsLogged } = this.context as AuthContextInterface

        this.setState({ isRequestWaiting: true })
        AuthService.signin(this.state.username, this.state.password).then(() => {
            this.setState({ isRequestWaiting: false })
            this.setState({ error: '' })
            setIsLogged(true)
            redirect('/dashboard')
        })
            .catch((error: any) => {
                console.log(error)
                this.setState({ isRequestWaiting: false })
                this.setState({ error: error.response.data.detail })
            }) // TODO: Handle connection error
    }

    render (): JSX.Element {
        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        Sign-in to your account
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            {this.state.error !== '' && <Message negative>
                                <Message.Header>Sign-in error</Message.Header>
                                <p>{this.state.error}</p>
                            </Message>}
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username or E-mail address'
                                onChange={event => this.setState({ username: event.target.value })}
                                data-testid='username-field'/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={event => this.setState({ password: event.target.value })}
                                data-testid='password-field'
                            />
                            <Button primary fluid size='large' loading={this.state.isRequestWaiting}
                                disabled={this.state.isRequestWaiting}
                                data-testid='submit-button'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    {(this.props.signInAndUpSamePage === false) && (
                        <Message>
                            Don&lsquo;t have account ? <Link to={'/signup'}>Sign Up </Link>
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        )
    }
}
