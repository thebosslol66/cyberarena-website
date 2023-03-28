import { Button } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Board, BoardData } from '../component/Game/Board'
import GameService from '../services/game.service'
import { CardModel } from '../client'
import EndGame from '../component/Game/EndGame'

const background = '/img/background/arena1.png'

interface IGamePageState {
    board: BoardData
    turn: number
    mana: number
    mana_max: number
    myNexusHp: number
    otherNexusHp: number
    dropDisabled: boolean
    turnDisabled: boolean
    winner: number
}
export default class GamePage extends React.Component <{}, IGamePageState> {
    private room_id: number = -1
    private player_id: number = -1
    private socket: WebSocket | undefined
    private readonly cardSaved: number[] = []
    private joueur: number = 0
    private attack: number[] = []

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
                    12: { id: 1012, id_pic: 12, name: 'Hector', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 },
                    13: { id: 1013, id_pic: 13, name: 'Hector', description: 'useless', cost: 10, damage: 5, health: 22, defense: 13 }
                },
                main_1: [],
                main_2: [],
                plateau_1: [],
                plateau_2: []
            },
            turn: 0,
            mana: 5,
            mana_max: 5,
            dropDisabled: true,
            turnDisabled: true,
            myNexusHp: 30,
            otherNexusHp: 30,
            winner: -1
        }
    }

    onNexusClick = (): void => {
        console.log('click nexus')
        if (this.attack.length === 1 && !this.state.turnDisabled) {
            console.log('attack_nexus')
            this.sendMessage({ type: 'attack_nexus', id_card: this.attack[0] })
            this.attack = []
        }
    }

    onCardClick = (card: number): void => {
        console.log(card)

        // Vérifier si le tableau d'attaque a déjà deux cartes
        if (this.attack.length === 2) {
            // Si oui, réinitialiser le tableau
            this.attack = []
        }

        // Vérifier si la carte est valide
        if (this.joueur === 1 && !this.state.turnDisabled) {
            if ((card < 100 && this.attack.length === 0) || (card >= 100 && this.attack.length === 1)) {
                console.log('push1')
                this.attack.push(card)
            }
        } else if (this.joueur === 2 && !this.state.turnDisabled) {
            if ((card >= 100 && this.attack.length === 0) || (card < 100 && this.attack.length === 1)) {
                console.log('push2')
                this.attack.push(card)
            }
        }

        // Vérifier si le tableau contient deux cartes valides
        if (this.attack.length === 2) {
            console.log('attack')
            this.sendMessage({ type: 'attack', id_card: this.attack[0], id_card2: this.attack[1] })
        }
    }

    startDrag = (result: any): void => {
        const cardDragged = parseInt(result.draggableId.match(/\d+/)[0], 10)
        if (this.state.board.cards_on_board[cardDragged].cost <= this.state.mana && !this.state.turnDisabled) {
            this.setState({ dropDisabled: false })
        } else {
            this.setState({ dropDisabled: true })
        }
    }

    onBoardChange = (board1: BoardData): void => {
        const cardToPlay = this.lastCardPlayed(board1)
        this.setState(({ board: board1 }), () => {
            if (cardToPlay !== -1) {
                this.sendMessage({ type: 'deploy_card', id_card: cardToPlay, card: this.state.board.cards_on_board[cardToPlay] })
                this.getMana()
            }
        })
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

    componentDidUpdate (prevProps: Readonly<{}>, prevState: Readonly<IGamePageState>, snapshot?: any): void {
        if (prevState.board !== this.state.board) {
            this.getNexusHealth()
        }
    }

    receiveMessage = (e: any): void => {
        // Convertir le message en objet JSON
        const data = JSON.parse(e.data)

        // Vérifier le type du message
        if (data.type === 'begin_game') {
            this.getMana()
            this.getNexusHealth()
        } else if (data.type === 'get_turn') {
            this.getMana()
            if (data.id_player === this.player_id) {
                this.setState({ turnDisabled: false })
            } else {
                this.setState({ turnDisabled: true })
            }
            this.getNexusHealth()
            this.attack = []
        } else if (data.type === 'end_game') {
            if (data.winner === 1 && this.state.winner !== 0) {
                this.setState({ winner: 1 })
            } else if (data.winner === 0) {
                this.setState({ winner: 0 })
            }
        } else if (data.type === 'deploy_card') {
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
            }))
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
                if (data.card.id >= 100) {
                    this.joueur = 2
                } else {
                    this.joueur = 1
                }
            })
        } else if (data.type === 'draw_card_private') {
            this.setState(prevState => ({
                board: {
                    ...prevState.board,
                    main_2: [...prevState.board.main_2, -1]
                }
            }))
        } else if (data.type === 'end_turn') {
            console.log(data)
        } else if (data.type === 'attack') {
            if (typeof data.card1 === 'number') {
                this.setState(prevState => ({
                    board: {
                        ...prevState.board,
                        plateau_1: prevState.board.plateau_1.filter(id => id !== data.card1),
                        plateau_2: prevState.board.plateau_2.filter(id => id !== data.card1)
                    }
                }))
            }
            if (typeof data.card2 === 'number') {
                this.setState(prevState => ({
                    board: {
                        ...prevState.board,
                        plateau_1: prevState.board.plateau_1.filter(id => id !== data.card2),
                        plateau_2: prevState.board.plateau_2.filter(id => id !== data.card2)
                    }
                }))
            }
            if (typeof data.card1 === 'object' && typeof data.card2 === 'object') {
                this.setState(prevState => ({
                    board: {
                        ...prevState.board,
                        cards_on_board: {
                            ...prevState.board.cards_on_board,
                            [data.card1.id]: data.card1,
                            [data.card2.id]: data.card2
                        }
                    }
                }))
            }
            this.getNexusHealth()
        } else if (data.type === 'get_mana') {
            this.setState({ mana: data.mana })
            this.setState({ mana_max: data.mana_max })
        } else if (data.type === 'get_nexus_health') {
            let myNexusHp = data.myhealth
            let otherNexusHp = data.ennemyhealth
            if (this.joueur === 1 && data.requester !== this.player_id) {
                myNexusHp = data.ennemyhealth
                otherNexusHp = data.myhealth
            }
            this.setState({ myNexusHp: myNexusHp, otherNexusHp: otherNexusHp }, () => {
                if (this.state.myNexusHp <= 0) {
                    this.setState({ winner: 0 })
                    this.sendMessage({ type: 'end_game', winner: 1 })
                } else if (this.state.otherNexusHp <= 0) {
                    this.setState({ winner: 1 })
                    this.sendMessage({ type: 'end_game', winner: 0 })
                }
            })
        }
    }

    // Définir une fonction qui envoie un message au serveur
    sendMessage = (msg: { type: string, card?: CardModel, id_card?: number, id_card2?: number, winner?: number }): void => {
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
        this.sendMessage({ type: 'get_mana' })
    }

    getNexusHealth = (): void => {
        this.sendMessage({ type: 'get_nexus_health' })
    }

    handleLeaveGame = (): void => {
        console.log(this.room_id)
        console.log(this.player_id)
        GameService.removeIdUser()
        GameService.removeRoomID()
        if (this.socket !== undefined) {
            this.setState({ winner: 0 })
            this.sendMessage({ type: 'end_game', winner: 1 })
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
                <EndGame open={this.state.winner !== -1} winner={this.state.winner}/>
                <Button icon='home' content='Leave Game' as={ Link } to='/dashboard' negative={ true } floated={ 'right' } style={{ marginTop: '2em', marginRight: '1em' }}/>
                <Button circular icon='plus' size='huge' content='Enemy Turn' disabled={ this.state.turnDisabled } negative={ false } floated={ 'left' } style={{ marginTop: '2em', marginLeft: '1em' }} onClick={this.nextTurn}/>
                <div style={{ position: 'absolute', right: '15%', width: '8%' }} onClick={ this.onNexusClick }>
                    <img
                        src={process.env.PUBLIC_URL + '/img/nexus/nexus_violet.png'}
                        alt='Nexus ennemi'
                        width={100}
                        height={100}
                    />
                    <span style={{ position: 'absolute', top: '36%', left: '23%', color: 'white', fontFamily: 'valorax, sans-serif' }}>
                        <style>
                            @import url(&#39;`https://fonts.cdnfonts.com/css/valorax&#39;`);
                        </style>
                        { this.state.otherNexusHp }
                    </span>
                </div>
                <Board board={ this.state.board } onBoardChange={ this.onBoardChange } startDrag={ this.startDrag } dropDisabled={ this.state.dropDisabled } onCardClick={ this.onCardClick }></Board>
                <div style={{ position: 'absolute', left: '7.5%', width: '8%', bottom: '8.6%' }}>
                    <img
                        src={process.env.PUBLIC_URL + '/img/nexus/nexus_bleu.png'}
                        alt='Mon nexus'
                        width={ 100 }
                        height={ 100 }
                    />
                    <span style={{ position: 'absolute', top: '36%', left: '23%', color: 'white', fontFamily: 'valorax, sans-serif' }}>
                        <style>
                            @import url(&#39;`https://fonts.cdnfonts.com/css/valorax&#39;`);
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
                        @import url(&#39;`https://fonts.cdnfonts.com/css/valorax&#39;`);
                    </style>
                    Votre Mana actuel : {this.state.mana} / {this.state.mana_max}
                </div>
            </div>
        )
    }
}
