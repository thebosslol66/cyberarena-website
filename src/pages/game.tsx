import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Board, BoardProps } from '../component/Game/Board'
import { GAME_STATE } from '../component/ui/D&D/utils'
import GameService from '../services/game.service'

const background = '/img/background/arena1.png'

interface IGamePageState {
    board: BoardProps
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
                    1: { id: 1, name: 'Heisenberg', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    2: { id: 2, name: 'Walter', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    3: { id: 3, name: 'Jesse', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    4: { id: 4, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    5: { id: 5, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    6: { id: 6, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    7: { id: 7, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    8: { id: 8, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    9: { id: 9, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    10: { id: 10, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    11: { id: 11, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    12: { id: 12, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    13: { id: 13, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    14: { id: 14, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    15: { id: 15, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    16: { id: 16, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    17: { id: 17, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    18: { id: 18, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    19: { id: 19, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    20: { id: 20, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    21: { id: 21, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    22: { id: 22, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    23: { id: 23, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    24: { id: 24, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    25: { id: 25, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 }
                },
                main_1: [],
                main_2: [],
                plateau_1: [],
                plateau_2: [],
                gameState: GAME_STATE.READY
            }
            
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
            // Faire quelque chose avec le message, par exemple afficher un composant conditionnel[^2^][3]
            console.log(data)
        } else if (data.type === 'end_game') {
            console.log(data)
        } else if (data.type === 'deploy_card') {
            console.log('deploy_card')
            console.log(data)
        } else if (data.type === 'draw_card') {
            console.log("main web " + data.card.id_pic)
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    main_1: [...prevState.board.main_1, data.card.id_pic]
                }
            }), () => {
                console.log("main : " + this.state.board.main_1)
            })
        } else if (data.type === 'draw_card_private') {
            console.log(data)
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
                <Board board={this.state.board}></Board>
            </div>
        )
    }
}
