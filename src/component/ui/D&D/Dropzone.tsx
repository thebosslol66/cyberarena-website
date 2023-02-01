import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { CardModel } from '../../../client'
interface Props {
    isDropDisabled: boolean
    cards: CardModel[]
    id: string
    color: string
    height: string
    width: string
}
const Dropzone: React.FC<Props> = ({ isDropDisabled, cards, id, color, height, width }) => {
    return (
        <Droppable key={id} droppableId={id} direction="horizontal" isDropDisabled={isDropDisabled}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ backgroundColor: color, width, height, margin: 'auto' }}
                >
                    {cards.map((card, index) => (
                        CardDrag(card, index)
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

const CardDrag = (card: CardModel, index: number): JSX.Element => (
    <Draggable draggableId={(card.id).toString()} index={index}>
        {provided => {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    Test
                </div>
            )
        }}
    </Draggable>
)

export default Dropzone
