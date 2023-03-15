import React from "react";
import "./card-static.css";
import Shine from "./card-shine";
import Glare from "./card-glare";

interface CardStaticProps {
    front_img: string;
    style: React.CSSProperties
    draggable_options?: any
    forwardedRef?: any
    hp:number
    dp:number
    ap:number
    cost:number
}
const cardText = `
<h3 className="card-title">{'name'}</h3>
<p className="card-description">{'description'}</p>
`;

export class CardStatic extends React.Component<CardStaticProps, any>{

    public render(): JSX.Element {
        return (
            <div className="card-static"
                 {...this.props.draggable_options}
                 ref={this.props.forwardedRef}
                >
                <div className="card-image" style={{ backgroundImage: `url(${this.props.front_img})` }}>
                    <div className="card-content">
                        <style>
                            @import url('https://fonts.cdnfonts.com/css/valorax');
                        </style>
                        <div className="card-cost">
                            {this.props.cost}
                        </div>
                        <div className="card-stats">
                            <div className="card-hp">
                                {this.props.hp}
                            </div>
                            <div className="card-ap">
                                {this.props.ap}
                            </div>
                            <div className="card-dp">
                                {this.props.dp}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}