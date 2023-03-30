import React, { Context } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { defaultSignValues, SignInterface } from '../../Interfaces/sign'
import AuthService from '../../../services/auth.service'
import { SignUpStatusDTO } from '../../../services/Interfaces/sign'
import { Link } from 'react-router-dom'
import AuthContext, { AuthContextInterface } from '../../../context/AuthContext'

export default class SignUpForm extends React.Component<SignInterface, {
    username: string
    password: string
    email: string
    passwordConfirm: string
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
            passwordConfirm: '',
            email: '',

            isRequestWaiting: false,

            error: ''
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const { setIsLogged } = this.context as AuthContextInterface
        if (this.state.username === '') {
            this.setState({ error: 'Username is required' })
            return
        }
        if (this.state.password === '') {
            this.setState({ error: 'Password is required' })
            return
        }
        if (this.state.passwordConfirm === '') {
            this.setState({ error: 'Password are differents' })
            return
        }
        if (this.state.email === '') {
            this.setState({ error: 'Email is required' })
            return
        }
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({ error: 'Password are differents' })
            return
        }

        this.setState({ isRequestWaiting: true })
        AuthService.signup(this.state.username, this.state.email, this.state.password).then((response: SignUpStatusDTO) => {
            this.setState({ isRequestWaiting: false })
            if (response.status === 0) {
                AuthService.signin(this.state.username, this.state.password).then(() => {
                    this.setState({ isRequestWaiting: false })
                    this.setState({ error: '' })
                    setIsLogged(true)
                })
                    .catch((error: Error) => {
                        this.setState({ isRequestWaiting: false })
                        this.setState({ error: error.message })
                    })
            } else {
                if (response.status === 1) {
                    this.setState({ error: 'Username already exists' })
                } else if (response.status === 2) {
                    this.setState({ error: 'Password must contain at least one special character' })
                } else if (response.status === 3) {
                    this.setState({ error: 'Email incorrect' })
                } else if (response.status === 4) {
                    this.setState({ error: 'Name is already used' })
                } else if (response.status === 5) {
                    this.setState({ error: 'Email already exists' })
                } else {
                    this.setState({ error: response.message })
                }
            }
        })
            .catch((error: Error) => {
                this.setState({ isRequestWaiting: false })
                this.setState({ error: error.message })
            }) // TODO: Handle connection error
    }

    render (): JSX.Element {
        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        Create a new account
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            {this.state.error !== '' && <Message negative>
                                <Message.Header>Sign-up error</Message.Header>
                                <p data-testid='error-signup-message'>{this.state.error}</p>
                            </Message>}
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                minLength={4}
                                required={true}
                                onChange={event => this.setState({ username: event.target.value })}
                                data-testid='username-field'
                            />
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' type='email'
                                onChange={event => this.setState({ email: event.target.value })}
                                required={true}
                                data-testid='email-field'/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                minLength={8}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                required={true}
                                onChange={event => this.setState({ password: event.target.value })}
                                data-testid='password-field'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm Password'
                                type='password'
                                minLength={8}
                                required={true}
                                onChange={event => this.setState({ passwordConfirm: event.target.value })}
                                data-testid='password-confirm-field'
                            />
                            <Button primary fluid size='large' type="submit" loading={this.state.isRequestWaiting}
                                disabled={this.state.isRequestWaiting}
                                data-testid='submit-button'
                            >
                                Create Account
                            </Button>
                        </Segment>
                    </Form>
                    {(this.props.signInAndUpSamePage === false) && (
                        <Message>
                            You have already an account ? <Link to={'/signin'}>Sign In </Link>
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        )
    }
}
