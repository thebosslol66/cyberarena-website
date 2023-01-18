import API_URL from './api.endpoints.json'
import api from './api'

const getMyAvatar = async (): Promise<Blob> => {
    return await api.get(API_URL.endpoint.myavatar, {
        responseType: 'blob'
    }).then((response) => {
        return response.data
    })
}

const getAvatar = async (username: string): Promise<Blob> => {
    return await api.get(API_URL.endpoint.avatar.replace('{username}', username), {
        responseType: 'blob'
    }).then((response) => {
        return response.data
    })
}

const getMyProfile = async (): Promise<any> => {
    return await api.get(API_URL.endpoint.myprofile).then((response) => {
        return response.data
    })
}

const getProfile = async (username: string): Promise<any> => {
    return await api.get(API_URL.endpoint.profile.replace('{username}', username)).then((response) => {
        return response.data
    })
}
const UserService = {
    getMyAvatar,
    getAvatar,
    getMyProfile,
    getProfile
}

export default UserService
