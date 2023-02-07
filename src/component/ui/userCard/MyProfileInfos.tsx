import React from 'react'
import { ProfileService } from '../../../client'
import { Card, Container, Placeholder } from 'semantic-ui-react'
import MyAvatar from './MyAvatar'

export default class MyUserProfile extends React.Component {
    state = { loading: true, username: '', active: false, email: '' }
    componentDidMount (): void {
        this.getProfile()
    }

    getProfile = (): void => {
        ProfileService.getCurrentUserProfileApiProfileMeGet().then((response) => {
            this.setState({ username: response.username, email: response.email, active: response.active, loading: false })
        })
    }

    render (): JSX.Element {
        return (
            <Container>
                <Card centered={true}>
                    <MyAvatar/>
                    <Card.Content extra={true}>
                        <Card.Header>
                            {this.state.loading
                                ?
                                (
                                    <Placeholder>
                                        <Placeholder.Header>
                                            <Placeholder.Line/>
                                        </Placeholder.Header>
                                    </Placeholder>
                                ) : (
                                    this.state.username
                                )}
                        </Card.Header>
                        <Card.Header>
                            { this.state.loading ? (
                                <Placeholder>
                                    <Placeholder.Header>
                                        <Placeholder.Line/>
                                    </Placeholder.Header>
                                </Placeholder>
                            ) : (
                                this.state.email
                            )}
                        </Card.Header>
                    </Card.Content>
                </Card>
            </Container>
        )
    }
}
