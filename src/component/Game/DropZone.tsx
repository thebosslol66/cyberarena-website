import { CardModel } from '../../client'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { DraggableCard } from './DraggableCard'

interface Props {
    cards: CardModel[]
    id: string
    height: string
    width: string
    isDropDisabled: boolean | undefined
    onCardClick?: (card: any) => void
    main: boolean
}

export class DropZone extends React.Component<Props, {}> {
    render (): JSX.Element {
        return (
            <Droppable droppableId={this.props.id} direction="horizontal" isDropDisabled={ this.props.isDropDisabled }>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            width: this.props.width,
                            height: this.props.height,
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        {this.props.cards.map((card, index) => (
                            <DraggableCard index={index} card={card} key={card.id} onCardClick={this.props.onCardClick} main={this.props.main}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}
