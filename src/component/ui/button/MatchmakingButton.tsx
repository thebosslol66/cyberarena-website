import { Button, Header, Icon, Loader, Modal } from 'semantic-ui-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import GameService from '../../../services/game.service'
import { TicketData } from '../../../services/Interfaces/game'

export default class MatchmakingButton extends React.Component {
    state = { ticketID: '-1', open: false, room_id: null, playable: false }
    private timeout: NodeJS.Timeout | undefined
    private readonly interval: number = 1000

    quitMachmaking = (): void => {
        GameService.cancel_ticket(this.state.ticketID).then(() => {
            this.setState({ ticketID: '-1', open: false })
            clearTimeout(this.timeout as NodeJS.Timeout)
        }).catch((error) => {
            console.log(error)
        })
    }

    OpenMatchmaking = (): void => {
        GameService.open_ticket().then((response: TicketData) => {
            this.setState({ ticketID: response.id })
            this.timeout = setTimeout(() => {
                this.fetchTicketStatus()
            }, this.interval)
        }).catch((error) => {
            console.log(error)
        })
    }

    fetchTicketStatus = (): void => {
        GameService.ticket_status(this.state.ticketID).then(response => {
            if (response.room_id !== -1) {
                this.setState({ room_id: response.room_id, playable: true })
            } else {
                setTimeout(this.fetchTicketStatus, this.interval)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render (): JSX.Element {
        return (
            <Modal
                basic
                onOpen={() => { this.setState({ open: true }) }}
                open={this.state.open}
                size='small'
                trigger={<Button primary size='massive' style={ { marginBottom: '1em' } } onClick={this.OpenMatchmaking}>Search for a player</Button>}
            >
                {this.state.playable
                    ? (
                        <Header as='h2' textAlign='center' style={ { paddingBottom: '3em' }}>
                            Game found !
                        </Header>
                    )
                    : (
                        <>
                            <Loader active/>
                            <Header as='h2' textAlign='center' style={ { paddingBottom: '3em' }}>
                                Searching for a player...
                            </Header>
                        </>

                    )}
                <Modal.Actions>
                    <Button disabled={this.state.playable} basic color='red' inverted onClick={this.quitMachmaking}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button disabled={!this.state.playable} basic color='blue' inverted as={NavLink} to={'/game'}>
                        <Icon name='check circle' /> Start game
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
