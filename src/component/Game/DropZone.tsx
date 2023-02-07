import { CardModel } from '../../client'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { DraggableCard } from './DraggableCard'

interface Props {
    isDropDisabled: boolean
    cards: CardModel[]
    id: string
    color: string
    height: string
    width: string
}

export class DropZone extends React.Component<Props, {}> {
    render (): JSX.Element {
        return (
            <Droppable droppableId={this.props.id} direction="horizontal" isDropDisabled={this.props.isDropDisabled}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            backgroundColor: this.props.color,
                            width: this.props.width,
                            height: this.props.height,
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        {this.props.cards.map((card, index) => (
                            <DraggableCard index={index} card={card} key={card.id}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}