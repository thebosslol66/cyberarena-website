import React from 'react'
import { SignInterface } from '../../Interfaces/sign'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import ProfileService from '../../../services/profile.service'

export default class ProfileForm extends React.Component<SignInterface, {
    username: string
    password: string
    email: string
    error: string
    newpassword: string
    response: string
}> {
    constructor (props: SignInterface) {
        super(props)
        this.state = {
            username: '',
            password: '',
            newpassword: '',
            email: '',
            error: '',
            response: ''
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (this.state.username !== '') {
            ProfileService.change_username(this.state.password, this.state.username).then((response) => {
                this.setState({ response })
            }).catch((error) => {
                console.log(error)
                this.setState({ error: error.detail })
            })
        }
        if (this.state.email !== '') {
            ProfileService.change_email(this.state.password, this.state.email).then((response) => {
                this.setState({ response })
            }).catch((error) => {
                this.setState({ error: error.detail })
            })
        }
        if (this.state.newpassword !== '') {
            ProfileService.change_password(this.state.password, this.state.newpassword).then((response) => {
                this.setState({ response })
            }).catch((error) => {
                this.setState({ error: error.detail })
            })
        }
    }

    render (): JSX.Element {
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.state.error !== '' && <Message negative>
                    <Message.Header>Profile Error</Message.Header>
                    <p>{this.state.error}</p>
                </Message>}
                {this.state.response !== '' && <Message positive>
                    <Message.Header>Update successful</Message.Header>
                </Message>}
                <Form.Field
                    fluid
                    icon='user'
                    iconPosition='left'
                    control={Input}
                    minLength={4}
                    label='Username'
                    placeholder='change your username'
                    onChange={ (event: { target: { value: any } }) => this.setState({ username: event.target.value })}
                />
                <Form.Field
                    fluid
                    icon='mail'
                    iconPosition='left'
                    control={Input}
                    label='Email'
                    placeholder='change your e-mail address'
                    type='email'
                    onChange={ (event: { target: { value: any } }) => this.setState({ email: event.target.value })}
                />
                <Form.Field
                    fluid
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder='change your password'
                    control={Input}
                    onChange={ (event: { target: { value: any } }) => this.setState({ newpassword: event.target.value })}
                />
                <Form.Field
                    fluid
                    icon='lock'
                    id='form-input-password'
                    iconPosition='left'
                    label='Confirm your current password'
                    type='password'
                    required={true}
                    placeholder='Confirm your current password'
                    control={Input}
                    onChange={ (event: { target: { value: any } }) => this.setState({ password: event.target.value })}
                />
                <Form.Field
                    control={Button}
                    content='Confirm'
                />
            </Form>

        )
    }
}
