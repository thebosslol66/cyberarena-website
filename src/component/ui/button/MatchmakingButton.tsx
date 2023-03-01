/* tslint:disable */
/* eslint-disable */
import { Button, Header, Icon, Loader, Modal } from 'semantic-ui-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import GameService from '../../../services/game.service'
import {TicketData} from "../../../services/Interfaces/game";

export default class MatchmakingButton extends React.Component {
    state = { ticketID: '-1', open: false, room_id: ''}
    private timeout: NodeJS.Timeout | undefined;
    componentDidUpdate(prevProps: any) {
        // Vérifiez si l'attribut ticketID a été mis à jour
        if (this.state.ticketID !== prevProps.ticketID) {
            // Effectuez les opérations nécessaires ici
            console.log("ticketID updated: ", this.state.ticketID);

        }
    }

    quitMachmaking = () => {
        GameService.cancel_ticket(this.state.ticketID).then(() => {
            this.setState({ ticketID : '-1', open: false })
            clearTimeout(this.timeout as NodeJS.Timeout);
        }).catch((error) => {
            console.log(error)
        })
    }

    OpenMatchmaking = () => {
        GameService.open_ticket().then((response : TicketData) => {
            console.log("resp id :"+response.id)
            console.log("id :"+this.state.ticketID)
            this.setState({ ticketID : response.id })
            this.timeout = setTimeout(() => {
                    this.fetchTicketStatus(this.state.ticketID);
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    fetchTicketStatus = (ticketID: string) => {
        GameService.ticket_status(ticketID).then((response: TicketData) => {
                if (response.room_id != null) {
                    // Si le ticket a été associé à une salle, mettez à jour le state room_id
                    this.setState({room_id: response.room_id});
                }
                if (this.state.ticketID == '-1') {
                    this.timeout = setTimeout(() => {
                        this.fetchTicketStatus(this.state.ticketID);
                    })
                }
            }).catch((error) => {
                console.log(error);
            });
    }
    render () {
        return (
            <Modal
                basic
                onOpen={() => { this.setState({ open: true }) }}
                open={this.state.open}
                size='small'
                trigger={<Button primary size='massive' style={ { marginBottom: '1em' } } onClick={this.OpenMatchmaking}>Search for a player</Button>}
            >
                <Loader active/>
                <Header as='h2' textAlign='center' style={ { paddingBottom: '3em' }}>
                    Searching for a player...
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.quitMachmaking}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button basic color='blue' inverted as={NavLink} to={'/game'}>
                        <Icon name='check circle' /> Start game
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
