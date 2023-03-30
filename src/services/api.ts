import axios, { AxiosInstance } from 'axios'
import TokenService from './token.service'

import API_URL from './api.endpoints.json'
import { Tokens } from './Interfaces/sign'

const instance: AxiosInstance = axios.create({
    baseURL: API_URL.url,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken()
        if (token != null) {
            if (config.headers == null) {
                config.headers = Object.assign({})
            }
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    async (error) => {
        return await Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
        return res
    },
    async (err): Promise<AxiosInstance> => {
        const originalConfig = err.config

        if (originalConfig.url !== API_URL.endpoint.signin && originalConfig.url !== API_URL.endpoint.refresh && err.response !== false) {
            /*
            if (err.request.status === 0) {
                TokenService.removeUser()
                return await Promise.reject(err)
            }
             */
            // Access Token was expired
            if (err.response.status === 401 && originalConfig._retry !== true) {
                originalConfig._retry = true

                try {
                    const rs = await instance.post(API_URL.endpoint.refresh, {
                        refresh_token: TokenService.getLocalRefreshToken()
                    })

                    const data: Tokens = rs.data
                    TokenService.setUser(data)

                    return await instance(originalConfig)
                } catch (_error) {
                    TokenService.removeUser()
                    return await Promise.reject(_error)
                }
            }
        }

        return await Promise.reject(err)
    }
)

export default instance
