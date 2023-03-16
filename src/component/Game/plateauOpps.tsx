import {CardModel} from "../../client";
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {DraggableCard} from "./DraggableCard";
import Card from "../ui/Card/card";
import {CardStatic} from "../ui/Card/card-static";

interface Props {
    cards: CardModel[]
    color: string
    height: string
    width: string
}

export class PlateauOpps extends React.Component<Props, {}> {
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
                    <CardStatic
                        front_img={`http://localhost:8000/api/game/card/${card.id_pic}/image`}
                        hp={card.health}
                        dp={card.defense}
                        ap={card.damage}
                        cost={card.cost}
                        style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                        }}
                        key={index}/>
                ))}
            </div>
        )
    }
}
