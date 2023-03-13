import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Board, BoardProps } from '../component/Game/Board'
import { GAME_STATE } from '../component/ui/D&D/utils'
import GameService from '../services/game.service'

const background = '/img/background/arena1.png'

interface IGamePageState {
    board: BoardProps
    turn: number
}
export default class GamePage extends React.Component <{}, IGamePageState> {
    private room_id: number = -1
    private player_id: number = -1
    private socket: WebSocket | undefined
    constructor (props: {}) {
        super(props)
        this.state = {
            board: {
                cards_on_board: {
                    1: { id: 1001, id_pic: 1, name: 'Heisenberg', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    2: { id: 1002, id_pic: 2, name: 'Walter', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    3: { id: 1003, id_pic: 3, name: 'Jesse', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    4: { id: 1004, id_pic: 4, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    5: { id: 1005, id_pic: 5, name: 'Gus', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    6: { id: 1006, id_pic: 6, name: 'Mike', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    7: { id: 1007, id_pic: 7, name: 'Hank', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    8: { id: 1008, id_pic: 8, name: 'Skyler', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    9: { id: 1009, id_pic: 9, name: 'Marie', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    10: { id: 1010, id_pic: 10, name: 'Walter Jr', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    11: { id: 1011, id_pic: 11, name: 'Tuco', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    12: { id: 1012, id_pic: 12, name: 'Hector', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                },
                main_1: [],
                main_2: [],
                plateau_1: [],
                plateau_2: [],
                gameState: GAME_STATE.READY
            },
            turn : 0
        }
    }

    componentDidMount (): void {
        this.createGame()
            .then(() => {
                if (this.socket !== undefined) {
                    this.socket.onmessage = this.receiveMessage
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    componentWillUnmount (): void {
        this.handleLeaveGame()
    }

    receiveMessage = (e: any): void => {
        // Convertir le message en objet JSON
        const data = JSON.parse(e.data)

        // Vérifier le type du message
        if (data.type === 'begin_game') {
            console.log(data)
        } else if (data.type === 'get_turn'){
            this.setState({turn : data.id_player})
            console.log(data)
        }
        else if (data.type === 'end_game') {
            console.log(data)
        } else if (data.type === 'deploy_card') {
            console.log('deploy_card')
            console.log(data)
        } else if (data.type === 'draw_card') {
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    main_1: [...prevState.board.main_1, data.card.id],
                    cards_on_board: {
                        ...prevState.board.cards_on_board,
                        [data.card.id]: data.card
                    }
                }
            }), () => {
                console.log("main : "+this.state.board.main_1)
                console.log(this.state.board.cards_on_board)
            })
        } else if (data.type === 'draw_card_private') {
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    main_2: [...prevState.board.main_2, 1],
                }
            }))
        } else if (data.type === 'end_turn') {
            console.log(data)
        } else if (data.type === 'attack') {
            console.log(data)
        }
    }

    // Définir une fonction qui envoie un message au serveur
    sendMessage = (msg: { type: string }): void => {
        // Convertir le message en chaîne JSON si nécessaire
        const data = JSON.stringify(msg)
        // Envoyer le message au serveur
        if (this.socket !== undefined) {
            this.socket.send(data)
        }
    }

    createGame = async (): Promise<void> => {
        return await new Promise((resolve, reject) => {
            this.room_id = GameService.getRoomID()
            this.player_id = GameService.getUserID()
            console.log(this.room_id)
            console.log(this.player_id)
            this.socket = new WebSocket(`ws://localhost:8000/api/game/${this.room_id}/ws/${this.player_id}`)
            this.socket.onopen = () => {
                resolve()
            }
            this.socket.onerror = (error) => {
                reject(error)
            }
        })
    }

    nextTurn = (): void => {
        this.sendMessage({ type: 'end_turn' })
    }

    handleLeaveGame = (): void => {
        console.log(this.room_id)
        console.log(this.player_id)
        GameService.removeIdUser()
        GameService.removeRoomID()
        if (this.socket !== undefined) {
            this.sendMessage({ type: 'close' })
            this.socket.close()
        }
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
                <Button icon='remove' content='Leave Game' as={Link} to='/dashboard' negative={ true } floated={ 'right' } style={{ marginTop: '2em', marginRight: '1em' }}/>
                <Button icon='remove' content='Next Turn' disabled={this.player_id !== this.state.turn} negative={ false } floated={ 'left' } style={{ marginTop: '2em', marginLeft: '1em' }} onClick={this.nextTurn}/>
                <Board board={this.state.board}></Board>
            </div>
        )
    }
}
