import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Board, BoardProps } from '../component/Game/Board'
import { GAME_STATE } from '../component/ui/D&D/utils'
import GameService from "../services/game.service";

const board: BoardProps = {
    cards_on_board: {
        1: {
            id: 1,
            name: 'Heisenberg',
            description: 'useless',
            cost: 10,
            damage: 5,
            health: 22,
            defense: 13
        },
        2: { id: 2, name: 'Walter', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
        3: { id: 3, name: 'Jesse', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
        4: { id: 4, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 }

    },
    main_1: [1, 2, 3, 4],
    main_2: [],
    plateau_1: [],
    plateau_2: [],
    gameState: GAME_STATE.READY
}

const background = '/img/background/arena1.png'

export default class GamePage extends React.Component <{ }, { } > {
    state = {room_id: null, player_id : null}

    componentDidMount() {
        this.setState({room_id: GameService.getRoomID(), player_id: GameService.getUserID()})
        const socket = new WebSocket(`ws://localhost:8000/api/game/${this.state.room_id}/ws/${this.state.player_id}`)
    }

    handleLeaveGame = () => {
        console.log('leave game')
        console.log("room id : "+this.state.room_id)
        console.log("player id : "+this.state.player_id)
        GameService.removeIdUser()
        GameService.removeRoomID()
    }

    render (): JSX.Element {
        return (
            <div style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                width: '100%',
                height: '100vh',
                position: 'relative'
            }}>
                <Button icon='remove' content='Leave Game' as={Link} to='/dashboard' negative={ true } floated={ 'right' } style={{ marginTop: '2em', marginRight: '1em' }} onClick={this.handleLeaveGame}/>
                <Board board={board}></Board>
            </div>
        )
    }
}
