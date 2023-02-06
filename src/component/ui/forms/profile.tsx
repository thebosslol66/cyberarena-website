import React, { Context } from 'react'
import { defaultSignValues, SignInterface } from '../../Interfaces/sign'
import AuthContext, { AuthContextInterface } from '../../../context/AuthContext'
import {Button, Form, Input, Message} from 'semantic-ui-react'
import {
    Body_change_avatar_api_profile_change_avatar_put,
    ChangeUserInformations,
    ProfileService
} from "../../../client";


export default class ProfileForm extends React.Component<SignInterface, {
    username: string
    password: string
    email: string
    error: string
    newpassword: string
}> {
    static defaultProps = defaultSignValues
    static contextType: Context<AuthContextInterface> = AuthContext

    constructor (props: SignInterface) {
        super(props)
        this.state = {
            username: '',
            password: '',
            newpassword: '',
            email: '',
            error: ''
        }
    }


    updateUsername = (new_username: ChangeUserInformations): void => {
        ProfileService.changeUsernameApiProfileChangeUsernamePut(new_username).catch((error) => {
            console.log(error)
        })
    }

    updateEmail = (new_email: ChangeUserInformations): void => {
        ProfileService.changeEmailApiProfileChangeEmailPut(new_email).catch((error) => {
            console.log(error)
        })
    }

    updatePassword = (new_password: ChangeUserInformations): void => {
        ProfileService.changePasswordApiProfileChangePasswordPut(new_password).then((response) => {
            console.log(response)
        })
    }

    updateAvatar = (new_avatar: Body_change_avatar_api_profile_change_avatar_put): void => {
        ProfileService.changeAvatarApiProfileChangeAvatarPut(new_avatar).then((response) => {
            console.log(response)
        })
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (this.state.username !== '') {
            let new_username: ChangeUserInformations = {
                password: this.state.password,
                new_setting: this.state.username
            }
            ProfileService.changeUsernameApiProfileChangeUsernamePut(new_username).catch((error) => {
                this.setState({ error: error })
            })
        }
        if (this.state.email !== '') {
            let new_email: ChangeUserInformations = {
                password: this.state.password,
                new_setting: this.state.email
            }
            ProfileService.changeEmailApiProfileChangeEmailPut(new_email).catch((error) => {
                this.setState({ error: error })
            })
        }
        if (this.state.newpassword !== '') {
            let new_password: ChangeUserInformations = {
                password: this.state.password,
                new_setting: this.state.newpassword
            }
            ProfileService.changePasswordApiProfileChangePasswordPut(new_password).catch((error) => {
                this.setState({ error: error })
            })
        }
        window.location.reload();

    }

    render (): JSX.Element {
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.state.error !== '' && <Message negative>
                    <Message.Header>Sign-up error</Message.Header>
                    <p data-testid='error-signup-message'>{this.state.error}</p>
                </Message>}
                <Form.Field
                    fluid
                    icon='user'
                    iconPosition='left'
                    control={Input}
                    minLength={4}
                    label='Username'
                    placeholder='change your username'
                    onChange={ (event: { target: { value: any; }; }) => this.setState({ username: event.target.value })}

                />
                <Form.Field
                    fluid
                    icon='mail'
                    iconPosition='left'
                    control={Input}
                    label='Email'
                    placeholder='change your e-mail address'
                    type='email'
                    onChange={ (event: { target: { value: any; }; }) => this.setState({ email: event.target.value })}
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
                    onChange={ (event: { target: { value: any; }; }) => this.setState({ newpassword: event.target.value })}
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
                    onChange={ (event: { target: { value: any; }; }) => this.setState({ password: event.target.value })}
                />
                <Form.Field
                    control={Button}
                    content='Confirm'
                />
            </Form>

        )
    }
}