import { Button, Header, Icon, Loader, Modal } from 'semantic-ui-react'
import React from 'react'
import { Navigate } from 'react-router-dom'
import GameService from '../../../services/game.service'
import { TicketData } from '../../../services/Interfaces/game'

interface IMatchmakingButtonState {
    ticketID: number;
    open: boolean;
    room_id: number;
    playable: boolean;
    playerID: number;

}
export default class MatchmakingButton extends React.Component<{}, IMatchmakingButtonState> {
    state: IMatchmakingButtonState = { ticketID: -1, open: false, room_id: -1, playable: false, playerID: -1 }
    private timeout: NodeJS.Timeout | undefined
    private readonly interval: number = 1000

    handleStartGame = (): void => {
        console.log('start game1')
        this.setState(prevState => {
            if (prevState.playerID !== -1 && prevState.room_id !== null) {
                console.log('start game2')
                console.log(prevState.playerID)
                console.log(prevState.room_id)
                GameService.setIdUser(prevState.playerID)
                GameService.setRoomID(prevState.room_id)
                return { playable: true }
            }
            return null
        })
    }

    quitMachmaking = (): void => {
        GameService.cancelTicket(this.state.ticketID).then(() => {
            this.setState({ ticketID: -1, open: false })
            clearTimeout(this.timeout as NodeJS.Timeout)
        }).catch((error) => {
            console.log(error)
        })
    }

    OpenMatchmaking = (): void => {
        GameService.openTicket().then((response: TicketData) => {
            this.setState({ ticketID: response.id })
            this.timeout = setTimeout(() => {
                this.fetchTicketStatus()
            }, this.interval)
        }).catch((error) => {
            console.log(error)
        })
    }

    fetchTicketStatus = async (): Promise<void> => {
        try {
            const response = await GameService.ticketStatus(this.state.ticketID)
            if (response.room_id !== -1) {
                this.setState({ room_id: response.room_id, playerID: response.player_id, playable: true });
            } else {
                setTimeout(this.fetchTicketStatus, this.interval)
            }
        } catch(error) {
            console.log(error)
        }
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
                    <Button disabled={!this.state.playable} basic color='blue' inverted onClick={this.handleStartGame}>
                        <Icon name='check circle' /> Start game
                    </Button>
                    {this.state.playable && <Navigate to="/game" />}
                </Modal.Actions>
            </Modal>
        )
    }
}
