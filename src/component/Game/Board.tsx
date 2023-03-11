import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { GAME_STATE } from '../ui/D&D/utils'
import { CardModel } from '../../client'
import { DropZone } from './DropZone'

export interface BoardProps {
    gameState: typeof GAME_STATE.READY
    main_1: number[]
    main_2: number[]
    plateau_1: number[]
    plateau_2: number[]
    cards_on_board: { [key: number]: CardModel }
}

interface BoardState {
    gameState: typeof GAME_STATE.READY
    board: {
        main_1: number[]
        main_2: number[]
        plateau_1: number[]
        plateau_2: number[]
        cards_on_board: { [key: number]: CardModel }
    }
}
export class Board extends React.Component<{ board: BoardProps }, BoardState> {
    constructor (props: { board: BoardProps }) {
        super(props)
        this.state = {
            gameState: props.board.gameState,
            board: {
                main_1: props.board.main_1,
                main_2: props.board.main_2,
                plateau_1: props.board.plateau_1,
                plateau_2: props.board.plateau_2,
                cards_on_board: props.board.cards_on_board
            }
        }
    }

    componentDidUpdate (prevProps: { board: BoardProps }) {
        if (prevProps.board !== this.props.board) {
            this.setState({
                gameState: this.props.board.gameState,
                board: {
                    main_1: this.props.board.main_1,
                    main_2: this.props.board.main_2,
                    plateau_1: this.props.board.plateau_1,
                    plateau_2: this.props.board.plateau_2,
                    cards_on_board: this.props.board.cards_on_board
                }
            })
        }
    }

    onDragEnd = (result: any): void => {
        if (result.destination == null) {
            return
        }

        if (result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index) {
            return
        }

        const sourceZoneId = result.source.droppableId as keyof BoardState['board']
        const destinationZoneId = result.destination.droppableId as keyof BoardState['board']

        const sourceZone = this.state.board[sourceZoneId] as number[]
        sourceZone.splice(result.source.index, 1)
        const destinationZone = Array.from(this.state.board[destinationZoneId] as number[])
        destinationZone.splice(result.destination.index, 0,
            parseInt(result.draggableId.split('-')[1]))

        const newBoard = {
            ...this.state.board,
            [sourceZoneId]: sourceZone,
            [destinationZoneId]: destinationZone
        }
        this.setState({ board: newBoard })
    }

    render (): JSX.Element {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <DropZone id="main_2" cards={ this.state.board.main_2.map(cardId => this.state.board.cards_on_board[cardId]) } isDropDisabled={ true } color={ 'red' } height={ '15%' } width={ '50%' }/>
                <DropZone id="plateau_2" cards={ this.state.board.plateau_2.map(cardId => this.state.board.cards_on_board[cardId]) } isDropDisabled={ true } color={ 'blue' } height={ '30%' } width={ '100%' }/>
                <DropZone id="plateau_1" cards={ this.state.board.plateau_1.map(cardId => this.state.board.cards_on_board[cardId]) } isDropDisabled={ false } color={ 'green' } height={ '30%' } width={ '100%' }/>
                <DropZone id="main_1" cards={ this.state.board.main_1.map(cardId => this.state.board.cards_on_board[cardId]) } isDropDisabled={ false } color={ 'yellow' } height={ '25%' } width={ '70%' }/>
            </DragDropContext>
        )
    }
}
