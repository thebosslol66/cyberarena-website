import { Button, Header, Icon, Loader, Modal } from 'semantic-ui-react'
import React from 'react'

export default class MatchmakingButton extends React.Component {
    state = { open: false }
    render () {
        return (
            <Modal
                basic
                onClose={() => { this.setState({ open: false }) }}
                onOpen={() => { this.setState({ open: true }) }}
                open={this.state.open}
                size='small'
                trigger={<Button primary positive size='massive' style={ { marginBottom: '1em' } }>Search for a player</Button>}
            >
                <Loader active/>
                <Header as='h2' textAlign='center' style={ { paddingBottom: '3em' }}>
                    Searching for a player...
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => { this.setState({ open: false }) }}>
                        <Icon name='remove' /> Cancel
                    </Button>

                </Modal.Actions>
            </Modal>
        )
    }
}
