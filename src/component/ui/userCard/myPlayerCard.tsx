/* tslint:disable */
/* eslint-disable */
import React from 'react'
import { Container, Grid, Header, Icon, Placeholder } from 'semantic-ui-react'
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
                <Grid>
                    <Grid.Row centered>
                        <MyAvatar/>
                    </Grid.Row>
                    <Grid.Row centered>
                        {this.state.loading
                            ? (
                                <Placeholder>
                                    <Placeholder.Line/>
                                </Placeholder>
                            )
                            : (
                                <Header as='h2' >
                                    {this.state.username}
                                </Header>
                            )
                        }
                    </Grid.Row>
                    <Grid.Row centered>
                        <Header as='h3' inline>
                            <Icon name='gem'/>
                            Cyber Points : 0
                        </Header>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Header as='h3' inline>
                            <Icon name='gamepad'/>
                            Cyber Level : 0
                        </Header>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}
