import React, { Component } from 'react';
import Card from '../card/Card';
import {Card as _card} from '../../unit/Card.js';
import './Container.css';
import store from '../../store';
import todo from '../../control/todo';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            toggledCard: null,
            diff: {
                x: 0,
                y: 0
            },
            cardArray: [1, 2, 3, 4 ,5],
            cardPositions: [],
            cardsInPlay: []
        }

        this.lastSeen = {
            x: null,
            y: null,
        }
        this.diff = {
            x: 0,
            y: 0
        }
        // this.onClickCard = this.onClickCard.bind(this);
        this.updateMouse = this.updateMouse.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        
    }

    componentDidMount() {
        // this.setState({cardPositions: this.generatePositions()})
    }


    generatePositions() {
        let length = this.state.cardArray.length;
        let firstPos = this.firstPos(length);
        // console.log('firstPos', firstPos);
        let positions = [];
            positions.push({'x': -firstPos, 'y': -20, 'status': false});
        for(let i = 1; i < length; i++) {
            positions.push({'x': -firstPos - (i * (150 + 20)), 'y': -20, 'status': false});
        }
        // console.log('positions', positions);
        return positions;
    }

    firstPos(nCards, inPlay) {
        let width = inPlay ? 1080 : 870;
        if(nCards === 1) {
            return (width -  20)/2;
        }
        return (width - ((nCards * 170)));
    }

    onMouseMove(e) {
        if(!this.state.toggled) {
            return;
        }

        let self = this;
        let temp = null;
        // console.log('this.props.container', this.props.container);

        this.props.container.option.inHand.map((el) => {
            if(el.id === this.state.toggledCard) {
                temp = Object.assign({}, el);
                temp.cLocation.x = el.cLocation.x + self.lastSeen.x - e.nativeEvent.x;
                temp.cLocation.y = el.cLocation.y + self.lastSeen.y - e.nativeEvent.y
            }
        });

        if(!temp) {
            console.log('something went terribly wrong moving card');
            return;
        }

        // console.log('onMouseMove', temp, this.state.toggledCard);
        todo['moveCard'].moveCard(store, temp);
        // todo['moveCard'].setCardPosition(store, newPos, this.state.toggledCard);



        this.lastSeen.x = e.nativeEvent.x;
        this.lastSeen.y = e.nativeEvent.y;
        //this.setState({ cardPositions[]: { x: this.lastSeen.x - e.screenX, y: this.lastSeen.y - e.screenY}});
    }

    updateMouse(lastSeen, cardNum, inPlay) {
        let status = !this.state.toggled ? true : false;
        // this.toggledCard = status ? cardNum : null;
        this.lastSeen.x = lastSeen.x;
        this.lastSeen.y = lastSeen.y;
        // console.log('inside updateMouse', status);
        this.setState({toggled: status, toggledCard: status ? cardNum : null});
    }

    getNewInPlayPosition(){
        let copy = this.state.cardsInPlay.slice();
        copy[0].x = -this.firstPos(copy.length ? copy.length : 1, true);
        // console.log(copy[0]);
        copy[0].y = -200;
        for(let i = 1; i < copy.length; i++) {
            copy[i].x = copy[0].x - (i * (150 + 20));
            copy[i].y = -200;
        }

        this.setState({cardsInPlay: copy});
    }

    render() {

        console.log('this.props.container', this.props.container);
        return (
            <div className='Icontainer' onMouseMove={this.onMouseMove}>
                { 
                    this.props.container.option.inPlay.map(function(position, i) {
                        return <Card key={i.toString()} number={i} updateMouse={this.updateMouse} card={position}/>;
                    }.bind(this))
                }
                <div className='CardContainer'>
                { 
                    this.props.container.option.inHand.map(function(position, i) {
                        return <Card key={i.toString()} number={i} updateMouse={this.updateMouse} card={position}/>;
                    }.bind(this))
                }
                THIS IS CARD CONTAINER
      </div>
                THIS IS CONTAINER
      </div>

        );
    }
}

export default Container;
