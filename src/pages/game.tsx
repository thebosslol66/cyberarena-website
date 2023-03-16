import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Board, BoardData } from '../component/Game/Board'
import GameService from '../services/game.service'
import {CardModel} from '../client'

const background = '/img/background/arena1.png'

interface IGamePageState {
    board: BoardData
    turn: number
    mana: number
    mana_max: number
    myNexusHp: number
    otherNexusHp: number
    dropDisabled: boolean
    onBoardChange?: (board: BoardData) => void
    startDrag?: (result: any) => void
}
export default class GamePage extends React.Component <{}, IGamePageState> {
    private room_id: number = -1
    private player_id: number = -1
    private socket: WebSocket | undefined
    private cardSaved: number[] = [];

    constructor (props: {}) {
        super(props)
        this.state = {
            board: {
                cards_on_board: {
                    0: { id: 1000, id_pic: 0, name: 'Skyler', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    1: { id: 1001, id_pic: 1, name: 'Heisenberg', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    2: { id: 1002, id_pic: 2, name: 'Walter', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    4: { id: 1004, id_pic: 4, name: 'Saul', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    5: { id: 1005, id_pic: 5, name: 'Gus', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    3: { id: 1003, id_pic: 3, name: 'Jesse', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    6: { id: 1006, id_pic: 6, name: 'Mike', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    7: { id: 1007, id_pic: 7, name: 'Hank', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    8: { id: 1008, id_pic: 8, name: 'Skyler', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    9: { id: 1009, id_pic: 9, name: 'Marie', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    10: { id: 1010, id_pic: 10, name: 'Walter Jr', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    11: { id: 1011, id_pic: 11, name: 'Tuco', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    12: { id: 1012, id_pic: 12, name: 'Hector', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 }
                },
                main_1: [],
                main_2: [],
                plateau_1: [],
                plateau_2: [],


            },
            onBoardChange: (board1: BoardData) => {
                let cardToPlay = this.lastCardPlayed(board1)
                console.log("onBoardChange")
                this.setState(({ board: board1 }), () => {
                    console.log("last card played : " + cardToPlay)
                    if (cardToPlay !== -1) {
                        this.sendMessage({type: 'deploy_card', id_card: cardToPlay, card: this.state.board.cards_on_board[cardToPlay] })
                    }
                })
            },
            startDrag: (result) => {
                console.log("onDragStart")
                console.log(result)
                let cardDragged = parseInt(result.draggableId.match(/\d+/)[0], 10)
                console.log("card dragged" + cardDragged)
                if (this.state.board.cards_on_board[cardDragged].cost <= this.state.mana) {
                    this.setState({dropDisabled: false})
                } else {
                    this.setState({dropDisabled: true})
                }
            },
            turn: 0,
            mana: -1,
            mana_max: -1,
            dropDisabled: true,
            myNexusHp: -1,
            otherNexusHp: -1
        }
    }

    lastCardPlayed = (board: BoardData): number => {
        const boardLength = board.plateau_1.length
        for (let i = boardLength - 1; i >= 0; i--) {
            const currentCardId = board.plateau_1[i]
            if (!this.cardSaved.includes(currentCardId)) {
                this.cardSaved.push(currentCardId)
                return currentCardId
            }
        }
        return -1
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
            this.getMana()
            this.getNexusHealth()
        } else if (data.type === 'get_turn') {
            this.setState({ turn: data.id_player })
            console.log(data)
        } else if (data.type === 'end_game') {
            console.log(data)
        } else if (data.type === 'deploy_card') {
            console.log('deploy_card')
            if (data.data === "Not enough mana") {
                console.log("Not enough mana")
                return
            }
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    cards_on_board: {
                        ...prevState.board.cards_on_board,
                        [data.id_card]: data.data.card
                    },
                    plateau_2: [...prevState.board.plateau_2, data.id_card],
                    main_2: prevState.board.main_2.slice(0, -1)
                }
            }), () => {
                console.log("plateau : "+this.state.board.plateau_1)
                })
        } else if (data.type === 'draw_card') {
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    cards_on_board: {
                        ...prevState.board.cards_on_board,
                        [data.card.id]: data.card
                    },
                    main_1: [...prevState.board.main_1, data.card.id]
                }
            }), () => {

            })
        } else if (data.type === 'draw_card_private') {
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    main_2: [...prevState.board.main_2, 1]
                }
            }))
        } else if (data.type === 'end_turn') {
            console.log(data)
        } else if (data.type === 'attack') {
            console.log(data)
        } else if (data.type === 'get_mana') {
            this.setState({mana : data.mana})
            this.setState({mana_max : data.mana_max})
        } else if (data.type === 'get_nexus_health') {
            this.setState({myNexusHp: data.myhealth, otherNexusHp: data.ennemyhealth})
        }
    }

    // Définir une fonction qui envoie un message au serveur
    sendMessage = (msg: { type: string, card?: CardModel, id_card?: number }): void => {
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
        this.getMana()
    }

    getMana = (): void => {
        console.log("getmana")
        this.sendMessage({type: 'get_mana'})
    }

    getNexusHealth = (): void => {
        console.log("getnexushp")
        this.sendMessage({type: 'get_nexus_health'})
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
                <Board board={this.state.board} onBoardChange={this.state.onBoardChange} startDrag={this.state.startDrag} dropDisabled={this.state.dropDisabled}></Board>
                <div style={{position: 'absolute', right: '15%', width:'8%'}}>
                    <img
                        src={process.env.PUBLIC_URL + "/img/nexus/nexus_violet.png"}
                        alt="Nexus ennemi"
                        width={100}
                        height={100}
                    />
                    <span style={{ position: "absolute", top: "36%", left: "23%", color: "white", fontFamily: 'valorax, sans-serif'}}>
                        <style>
                            @import url('https://fonts.cdnfonts.com/css/valorax');
                        </style>
                        { this.state.myNexusHp }
                    </span>
                </div>
                <div style={{position: 'absolute', left: '7.5%', width:'8%', bottom:'8.6%'}}>
                    <img
                        src={process.env.PUBLIC_URL + "/img/nexus/nexus_bleu.png"}
                        alt="Mon nexus"
                        width={100}
                        height={100}
                    />
                    <span style={{ position: "absolute", top: "36%", left: "23%", color: "white", fontFamily: 'valorax, sans-serif'}}>
                        <style>
                            @import url('https://fonts.cdnfonts.com/css/valorax');
                        </style>
                        { this.state.myNexusHp }
                    </span>
                </div>

                <div className='current-mana'
                style={{
                        fontSize: '30px',
                        fontFamily: 'valorax, sans-serif',
                        position: 'absolute',
                        top: '75%',
                        left: '84%',
                        textAlign: 'right',
                        width: '15%',
                        color: 'white'
                }}>
                    <style>
                        @import url('https://fonts.cdnfonts.com/css/valorax');
                    </style>
                    Votre Mana actuel : {this.state.mana} / {this.state.mana_max}
                </div>
            </div>
        )
    }
}
