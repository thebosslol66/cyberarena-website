import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid } from 'semantic-ui-react'
import Card from '../Card/card'
interface Props {
    isDropDisabled: any
    cards: any
    id: any
}
const Dropzone: React.FC<Props> = ({ isDropDisabled, cards, id }) => {
    return (
        <Grid.Row>
            <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
                {provided => {
                    return (
                        <div className="menu hero-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {cards.map((name: string, index: any) => (
                                <CardDrag key={name} name={name} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </Grid.Row>
    )
}

const CardDrag = (name: any, index: any) => (
    <Draggable key={name} draggableId={name} index={index}>
        {provided => {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card number={190}
                        name={'First'}
                        subtypes={'basic v'}
                        supertype={'pokemon'}
                        rarity={'rare ultra'}
                        gallery={'false'}
                        style={{ maxWidth: '35vmin', margin: 'auto' }}
                        back_img={'https://images.pokemontcg.io/base1/1_hires.png'}
                        front_img={'https://images.pokemontcg.io/base1/1_hires.png'}/>
                </div>
            )
        }}
    </Draggable>
)

export default Dropzone
