import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import MyProfile from '../component/ui/userCard/myPlayerCard'
import MatchmakingButton from '../component/ui/button/MatchmakingButton'

function UserInteractions (): JSX.Element {
    return (
        <Container>
            <Segment style={{ background: 'url(https://tse2.mm.bing.net/th?id=OIP.3Ul6JBo9vK-rS4z-7GAnfwHaEK) no-repeat center center', backgroundSize: 'cover', marginTop: '1em', marginBottom: '1em' }}>
                <Grid columns={2} relaxed='very' centered={true} stackable={true} reversed={'tablet computer'}>
                    <Grid.Column verticalAlign={'middle'} tablet={7} computer={8} widescreen={10}>
                        <MatchmakingButton />
                    </Grid.Column>
                    <Grid.Column tablet={8} computer={7} widescreen={5}>
                        <MyProfile />
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    )
}
function Dashboard (): JSX.Element {
    return (
        <Segment basic style={{ paddingTop: '6em' }} fluid="true">
            <UserInteractions/>
        </Segment>
    )
}

export default Dashboard
