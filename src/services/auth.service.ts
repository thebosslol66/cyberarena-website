import api from './api'
import TokenService from './token.service'

import API_URL from './api.endpoints.json'
import { SignUpStatusDTO, Tokens } from './Interfaces/sign'

const signup = async (username: string, email: string, password: string): Promise<SignUpStatusDTO> => {
    return await api.post(API_URL.endpoint.signup, {
        username,
        email,
        password
    }).then(
        (response) => {
            return response.data
        }
    )
}

const signin = (username: string, password: string): any => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return api
        .post(API_URL.endpoint.signin, {
            username,
            password
        },
        config)
        .then((response) => {
            if (response.data.access_token !== undefined) {
                TokenService.setUser(response.data)
            }
            return response.data
        })
}

const signout = (): void => {
    TokenService.removeUser()
}

const getCurrentUser = (): Tokens | null => {
    const user: Tokens = TokenService.getUser()
    if (user.refresh_token === undefined) {
        return null
    }
    return user
}

const AuthService = {
    signup,
    signin,
    signout,
    getCurrentUser
}

export default AuthService
