import { Tokens } from './Interfaces/sign'

const getLocalRefreshToken = (): string | null => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    return user?.refresh_token
}

const getLocalAccessToken = (): string | null => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    return user?.access_token
}

const getLocalExpireTime = (): number | null => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    return user?.expires
}

const updateLocalAccessToken = (token: string, expireTime: number): void => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    user.access_token = token
    user.expires = expireTime
    localStorage.setItem('user', JSON.stringify(user))
}

const getUser = (): Tokens => {
    return JSON.parse(localStorage.getItem('user') ?? '{}')
}

const setUser = (user: Tokens): void => {
    localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = (): void => {
    localStorage.removeItem('user')
}

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
    getLocalExpireTime
}

export default TokenService
