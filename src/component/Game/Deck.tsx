import {CardModel} from "../../client";
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {DraggableCard} from "./DraggableCard";
import Card from "../ui/Card/card";

interface Props {
    cards: CardModel[]
    color: string
    height: string
    width: string
}

export class Deck extends React.Component<Props, {}> {
    render (): JSX.Element {
        return (
            <div
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
                    <div key={index}>
                        <Card number={190}
                              name={'First'}
                              subtypes={'basic v'}
                              supertype={'pokemon'}
                              rarity={'rare ultra'}
                              gallery={'false'}

                              back_img={'https://images.pokemontcg.io/base1/1_hires.png'}
                              front_img={`http://localhost:8000/api/game/card/${card.id_pic}/image`}

                              style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                              }}
                        />
                    </div>
                ))}

            </div>
        )
    }
}
