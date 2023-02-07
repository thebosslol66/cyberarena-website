import { CardModel } from '../../client'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    index: number
    card: CardModel
}
export class DraggableCard extends React.Component<Props, any> {
    render (): JSX.Element {
        return (
            <Draggable draggableId={`card-${this.props.card.id}`} index={this.props.index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {this.props.card.name}
                    </div>
                )}
            </Draggable>
        )
    }
}
