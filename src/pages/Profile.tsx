import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import MyUserProfile from '../component/ui/userCard/MyProfileInfos'
import ProfileForm from '../component/ui/forms/profile'

function ProfileInteractions (): JSX.Element {
    return (
        <Container>
            <Segment style={{ marginTop: '1em', marginBottom: '1em' }}>
                <Grid columns={2} relaxed='very' centered={true} stackable={true} reversed={'tablet computer'}>
                    <Grid.Column verticalAlign={'middle'} tablet={7} computer={8} widescreen={10}>
                        <ProfileForm/>
                    </Grid.Column>
                    <Grid.Column tablet={8} computer={7} widescreen={5}>
                        <MyUserProfile />
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    )
}

function ProfilePage (): JSX.Element {
    return (
        <Segment basic style={{ paddingTop: '6em' }} fluid="true">
            <ProfileInteractions/>
        </Segment>
    )
}

export default ProfilePage
