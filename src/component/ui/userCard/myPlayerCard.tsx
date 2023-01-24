/* tslint:disable */
/* eslint-disable */
import React from 'react'
import {Button, Grid, GridColumn, GridRow, Header, Image, Placeholder, Segment} from 'semantic-ui-react'
import { ProfileService, SignService } from '../../../client'
import MyAvatar from './MyAvatar'

export default class MyProfile extends React.Component {
    state = { loading: true, username: '', email: '', active: false }

    componentDidMount () {
        this.getProfile()
    }

    getProfile = (): void => {
        ProfileService.getCurrentUserProfileApiProfileMeGet().then((response) => {
            this.setState({ username: response.username, email: response.email, active: response.active, loading: false })
        })
    }
    render () {
        return (
            <Segment>
                <Header as='h2' textAlign='center'>
                    My Cyber Profile
                </Header>
                <Grid celled>
                    <GridColumn width={4}>
                        <MyAvatar/>
                    </GridColumn>

                    <GridColumn width={8}>
                        {this.state.loading
                            ? (
                                <Placeholder>
                                    <Placeholder.Line/>
                                    <Placeholder.Line/>
                                </Placeholder>
                            )
                            : (
                                <Grid.Row>
                                    <Header as='h3' >
                                        {this.state.username}
                                    </Header>
                                    <Header as='h3' >
                                        {this.state.email}
                                    </Header>
                                </Grid.Row>
                            )
                        }
                    </GridColumn>
                    <GridColumn width={4}>
                        <Grid.Row>
                            <Header as='h3' >
                                Cyber Points : 0
                            </Header>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '1em' }}>
                            <Header as='h3' >
                                Cyber Level : 0
                            </Header>
                        </Grid.Row>
                    </GridColumn>
                </Grid>
            </Segment>
        )
    }
}
