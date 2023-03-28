import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { CardModel } from '../../client'
import { DropZone } from './DropZone'
import { Deck } from './Deck'
import { PlateauOpps } from './plateauOpps'

export interface BoardData {
    main_1: number[]
    main_2: number[]
    plateau_1: number[]
    plateau_2: number[]
    cards_on_board: { [key: number]: CardModel }
}

export interface BoardProps {
    board: BoardData
    onBoardChange?: (board: BoardData) => void
    startDrag?: (start: any) => void
    onCardClick?: (card: number) => void
    dropDisabled?: boolean | undefined
}

export interface BoardState {
    board: {
        main_1: number[]
        main_2: number[]
        plateau_1: number[]
        plateau_2: number[]
        cards_on_board: { [key: number]: CardModel }
    }
}
export class Board extends React.Component<BoardProps, BoardState> {
    constructor (props: BoardProps) {
        super(props)
        this.state = {
            board: {
                main_1: props.board.main_1,
                main_2: props.board.main_2,
                plateau_1: props.board.plateau_1,
                plateau_2: props.board.plateau_2,
                cards_on_board: props.board.cards_on_board
            }
        }
    }

    componentDidUpdate (prevProps: BoardProps, prevState: BoardState): void {
        if (prevProps.board !== this.props.board) {
            this.setState(
                {
                    board: {
                        main_1: this.props.board.main_1,
                        main_2: this.props.board.main_2,
                        plateau_1: this.props.board.plateau_1,
                        plateau_2: this.props.board.plateau_2,
                        cards_on_board: this.props.board.cards_on_board
                    }
                }
            )
        }
    }

    onCardClick = (card: number): void => {
        this.props.onCardClick?.(card)
    }

    onDragStart = (result: any): void => {
        this.props.startDrag?.(result)
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

        if (sourceZoneId === 'plateau_1' && destinationZoneId === 'main_1') {
            return
        }

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
        this.setState({
            board: newBoard
        }, () => {
            this.props.onBoardChange?.(newBoard)
        })
    }

    render (): JSX.Element {
        return (
            <>
                <Deck cards={ this.state.board.main_2.map(cardId => this.state.board.cards_on_board[cardId]) } height={ '10%' } width={ '50%' }/>
                <PlateauOpps cards={ this.state.board.plateau_2.map(cardId => this.state.board.cards_on_board[cardId]) } height={ '25%' } width={ '100%' } onCardClick={this.onCardClick}/>
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                    <DropZone id="plateau_1" main={ false } cards={ this.state.board.plateau_1.map(cardId => this.state.board.cards_on_board[cardId]) } isDropDisabled={this.props.dropDisabled} height={ '25%' } width={ '20%' } onCardClick={this.onCardClick}/>
                    <DropZone id="main_1" main={ true } cards={ this.state.board.main_1.map(cardId => this.state.board.cards_on_board[cardId]) } isDropDisabled={this.props.dropDisabled} height={ '40%' } width={ '70%' }/>
                </DragDropContext>
            </>
        )
    }
}
