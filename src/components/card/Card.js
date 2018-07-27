import React, { Component } from 'react';
import './Card.css';
import store from '../../store';
import todo from '../../control/todo';

class Card extends Component {
    constructor(props) {
        super(props);
        this.size = {
            width: 150,
            height: 200
        }
        
        this.lastSeen = {
            x: null,
            y: null,
        }

        // this.state = {
        //     position: {
        //         x: this.props.card.cLocation.x,
        //         y: this.props.card.cLocation.y,
        //     }
        // } 
        this.onClickCard = this.onClickCard.bind(this);
        // this.onMouseMove = this.onMouseMove.bind(this);
        console.log('hello from card #' + this.props.number);
    }

 
    onClickCard(e) {

        this.lastSeen = {
            x: e.nativeEvent.x,
            y: e.nativeEvent.y
        }
        todo['moveCard'].moveCard(store, this.props.card);


        console.log('Mouse initial Coords, x:', this.lastSeen.x, 'y:', this.lastSeen.y);
        this.props.updateMouse(this.lastSeen, this.props.card.id, this.props.status);
    }

    render() {
        return (
            <div className='Card' onMouseDown={this.onClickCard} onMouseUp={this.onClickCard} onMouseMove={this.onMouseMove}
            style={{position: 'absolute', left: -this.props.card.cLocation.x, top: -this.props.card.cLocation.y}}> 
            THIS IS CARD
            <br/> x : {-this.props.card.cLocation.x}
            <br/> y : {-this.props.card.cLocation.y}
             </div>
        );
    }
}

export default Card;
