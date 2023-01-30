/* tslint:disable */
/* eslint-disable */
import React from 'react'
import {Card, Container, Grid, Header, Icon, Placeholder} from 'semantic-ui-react'
import { ProfileService } from '../../../client'
import MyAvatar from './MyAvatar'

export default class MyProfile extends React.Component {
    state = { loading: true, username: '', active: false }
    componentDidMount () {
        this.getProfile()
    }

    getProfile = (): void => {
        ProfileService.getCurrentUserProfileApiProfileMeGet().then((response) => {
            this.setState({ username: response.username, active: response.active, loading: false })
        })
    }
    render () {
        return (
            <Container>
                <Card>

                    <MyAvatar/>
                            <Card.Content extra={true}>
                                <Card.Header>
                                    {this.state.loading ? (
                                        <Placeholder>
                                            <Placeholder.Header>
                                                <Placeholder.Line/>
                                            </Placeholder.Header>
                                        </Placeholder>
                                    ) : (
                                        this.state.username
                                    )}
                                </Card.Header>
                                <Card.Description>
                                        <Icon name="gamepad" />
                                        Cyber Level :{" "}
                                        {this.state.loading ? (
                                            <Placeholder>
                                                <Placeholder.Line />
                                            </Placeholder>
                                        ) : (0)}
                                </Card.Description><Card.Description textAlign={"right"}>
                                        <Icon name="gem" />
                                        Cyber Points :{" "}
                                        {this.state.loading ? (
                                            <Placeholder>
                                                <Placeholder.Line />
                                            </Placeholder>
                                        ) : (0)}
                                </Card.Description>
                            </Card.Content>
                        </Card>
            </Container>
        )
    }
}
/*
{this.state.loading ? (
    <Placeholder>
        <Placeholder.Line />
    </Placeholder>
) : (
    <Header as="h2">{this.state.username}</Header>
)}
<p style={{ marginTop: "10px" }}>
    <Icon name="gamepad" />
    Cyber Level :{" "}
    {this.state.loading ? (
        <Placeholder>
            <Placeholder.Line />
        </Placeholder>
    ) : (0)}
</p>
<p style={{ marginTop: "10px" }}>
    <Icon name="gem" />
    Cyber Points :{" "}
    {this.state.loading ? (
        <Placeholder>
            <Placeholder.Line />
        </Placeholder>
    ) : (0)}
*/