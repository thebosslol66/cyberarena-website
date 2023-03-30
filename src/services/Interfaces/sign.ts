interface SignUpData {
    username: string
    password: string
    email: string
}

interface ChangeUserInformations {
    password: string
    new_setting: string
}

interface SignUpStatusDTO {
    status: number
    message: string
}

interface Tokens {

    access_token: string
    refresh_token: string
    token_type: string
    expires: number
}

interface AskNewTokenData {
    refresh_token: string
}

export type {
    SignUpData,
    SignUpStatusDTO,
    Tokens,
    AskNewTokenData,
    ChangeUserInformations
}
