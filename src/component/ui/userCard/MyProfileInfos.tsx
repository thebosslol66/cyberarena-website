import React from 'react'
import { ProfileService } from '../../../client'
import { Card, Container, Placeholder } from 'semantic-ui-react'
import MyAvatar from './MyAvatar'
import ProfileContext from '../../../context/ProfileContext'

export default class MyUserProfile extends React.Component {
    state = { loading: true, username: '', active: false, email: '' }
    componentDidMount (): void {
        this.getProfile()
    }

    getProfile = (): void => {
        ProfileService.getCurrentUserProfileApiProfileMeGet().then((response) => {
            this.setState({ username: response.username, email: response.email, active: response.active, loading: false })
        }).catch((error) => {
            console.log(error)
        })
    }

    render (): JSX.Element {
        return (
            <ProfileContext.Consumer>
                {({ username, email, loading }) => (
                    <Container>
                        <Card centered={true}>
                            <MyAvatar/>
                            <Card.Content extra={true}>
                                <Card.Header>
                                    { loading
                                        ? (
                                            <Placeholder>
                                                <Placeholder.Header>
                                                    <Placeholder.Line/>
                                                </Placeholder.Header>
                                            </Placeholder>
                                        )
                                        : (
                                            <>
                                                { username }
                                            </>
                                        )}
                                </Card.Header>
                                <Card.Header>
                                    { loading
                                        ? (
                                            <Placeholder>
                                                <Placeholder.Header>
                                                    <Placeholder.Line/>
                                                </Placeholder.Header>
                                            </Placeholder>
                                        )
                                        : (
                                            <>
                                                { email }
                                            </>
                                        )}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Container>
                )}
            </ProfileContext.Consumer>
        )
    }
}
