/* tslint:disable */
/* eslint-disable */
import React from 'react'
import {Button, Grid, GridColumn, GridRow, Header, Placeholder, Segment} from 'semantic-ui-react'
import { ProfileService, SignService } from '../../../client'
import MyAvatar from './MyAvatar'

export default class MyProfile extends React.Component {
    state = { loading: true, username: '', email: '', active: false }

    componentDidMount () {
        this.getProfile()
        setTimeout(() => this.setState({ loading: false }), 1500)
    }

    getProfile = (): void => {
        ProfileService.getCurrentUserProfileApiProfileMeGet().then((response) => {
            this.setState({ username: response.username, email: response.email, active: response.active, loading: false })
        })
    }

    activateProfile = (): void => {
        SignService.setUserActiveApiSignActivateGet(this.state.username).then(() => {
            this.setState({ active: true })
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
                        {this.state.loading
                            ? (
                                <Placeholder>
                                    <Placeholder.Image square fluid/>
                                </Placeholder>
                            )
                            : (<MyAvatar/>)}
                    </GridColumn>

                    <GridColumn width={8}>
                        <Grid.Row>
                            <Header as='h3' >
                                {this.state.username}
                            </Header>
                        </Grid.Row>

                        <Grid.Row style={{ paddingTop: '1em' }}>
                            <Header as='h3' >
                                {this.state.email}
                            </Header>
                        </Grid.Row>



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
