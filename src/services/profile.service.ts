import api from './api'
import TokenService from './token.service'

import API_URL from './api.endpoints.json'
import { ChangeUserInformations } from './Interfaces/sign'


const change_username = async (password: string, new_setting: string): Promise<string> => {
    return await api.put(API_URL.endpoint.change_username, {
        password,
        new_setting
    }).then(
        (response) => {
            return response.data
        }
    )
}

const change_email = async (password: string, new_setting: string): Promise<string> => {
    return await api.put(API_URL.endpoint.change_email, {
        password,
        new_setting
    }).then(
        (response) => {
            return response.data
        }
    )
}

const change_password = async (password: string, new_setting: string): Promise<string> => {
    return await api.put(API_URL.endpoint.change_password, {
        password,
        new_setting
    }).then(
        (response) => {
            return response.data
        }
    )
}

const change_avatar = async (avatar: string): Promise<string> => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return await api.put(API_URL.endpoint.change_avatar, {
        avatar
    }).then(
        (response) => {
            return response.data
        }
    )
}

const ProfileService = {
    change_username,
    change_email,
    change_password,
    change_avatar
}

export default ProfileService