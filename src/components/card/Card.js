import React, { Component } from 'react';
import './Card.css';
import store from '../../store';
import todo from '../../control/todo';

class CardComponent extends Component {
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

        this.beingDropped = false;

        // this.state = {
        //     position: {
        //         x: this.props.card.cLocation.x,
        //         y: this.props.card.cLocation.y,
        //     }
        // } 
        this.onClickCard = this.onClickCard.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.cancelCard = this.cancelCard.bind(this);
        // this.onMouseMove = this.onMouseMove.bind(this);
        console.log('hello from card #' + this.props.number, this.props.card);
    }

 
    onClickCard(e) {

        this.lastSeen = {
            x: e.nativeEvent.x,
            y: e.nativeEvent.y
        }
        // console.log('Mouse initial Coords, x:', this.lastSeen.x, 'y:', this.lastSeen.y);
        this.props.updateMouse(this.lastSeen, this.props.card.id);
        // todo['moveCard'].moveCard(store, this.props.card);
    }

    onMouseUp() {
        // console.log('Permamoving card', this.props.card);
        this.props.updateMouse(this.lastSeen, this.props.card.id);
        todo['permaMoveCard'].permaMoveCard(store, this.props.card);
    }

    cancelCard() {
        todo['cancelCard'].cancelCard(store, this.props.card);
    }

    render() {
        return !this.props.card.dummy ? (
            <div className={'Card'} onMouseDown={this.onClickCard} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}
            style={{
                position: 'absolute', 
                left: -this.props.card.cLocation.x, 
                top: -this.props.card.cLocation.y, 
                backgroundColor: 'rgb(' + this.props.card.color.R + ',' + this.props.card.color.G + ',' + this.props.card.color.B +')'}}> 
            THIS IS CARD
            <br/> x : {-this.props.card.cLocation.x}
            <br/> y : {-this.props.card.cLocation.y}            
            { this.props.card.canCancel && 
                <button onClick={this.cancelCard}>
                    Cancel
                </button> 
            }
             </div>
        ) :
        (
            <div className={'dummy'} onMouseDown={this.onClickCard} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}
            style={{
                position: 'absolute', 
                left: -this.props.card.cLocation.x, 
                top: -this.props.card.cLocation.y}}> 
            THIS IS DUMMY CARD
            <br/> x : {-this.props.card.cLocation.x}
            <br/> y : {-this.props.card.cLocation.y}

             </div>
        );
    }
}

export default CardComponent;
