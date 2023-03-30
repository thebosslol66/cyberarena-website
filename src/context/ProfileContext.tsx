import React, { useState } from 'react'
import { ProfileService } from '../client'

interface ProfileContextInterface {
    username: string
    setUsername: (arg0: string) => void
    email: string
    setEmail: (arg0: string) => void
    loading: boolean
    setLoading: (arg0: boolean) => void
}

const ProfileContext = React.createContext<ProfileContextInterface>({
    username: '',
    setUsername: () => {
    },
    email: '',
    setEmail: () => {

    },
    loading: true,
    setLoading: () => {

    }

})

const ProfileProvider = ({ children }: any): JSX.Element => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)

    useState(() => {
        ProfileService.getCurrentUserProfileApiProfileMeGet().then((response) => {
            setUsername(response.username)
            setEmail(response.email)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    })

    return (
        <ProfileContext.Provider value={{ username, setUsername, email, setEmail, loading, setLoading }}>
            {children}
        </ProfileContext.Provider>
    )
}

export type { ProfileContextInterface }

export { ProfileProvider }

export default ProfileContext
