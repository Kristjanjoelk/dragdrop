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
        console.log('this.props.container', this.props.container);
        // this.onClickCard = this.onClickCard.bind(this);
        this.updateMouse = this.updateMouse.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        
    }

    componentDidMount() {
        this.setState({cardPositions: this.generatePositions()})
    }


    generatePositions() {
        let length = this.state.cardArray.length;
        let firstPos = this.firstPos(length);
        console.log('firstPos', firstPos);
        let positions = [];
            positions.push({'x': -firstPos, 'y': -20, 'status': false});
        for(let i = 1; i < length; i++) {
            positions.push({'x': -firstPos - (i * (150 + 20)), 'y': -20, 'status': false});
        }
        console.log('positions', positions);
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

        console.log('this.props.container', this.props.container);
        let newPos = this.props.container.option.inHand.map((el) => {
            return el.id === this.state.toggledCard ? ({ 
                cLocation: { 
                    x: el.x + self.lastSeen.x - e.nativeEvent.x, 
                    y: el.y + self.lastSeen.y - e.nativeEvent.y
                },
                pLocation: {
                    x: 0,
                    y: 0
                },
                canCancel: true,

                }) : el
        });
        // let newPos = {
        //     x: el.x + this.lastSeen.x - e.nativeEvent.x, 
        //     y: el.y + this.lastSeen.y - e.nativeEvent.y
        // }
        // 2. calculated x diff and y diff to see where the mouse moved
        // 3. apply to element
        // this.setState({cardPositions: this.state.cardPositions.map((el, i) => {
        //     return i === this.state.toggledCard ? Object.assign({}, el, {x: el.x + this.lastSeen.x - e.nativeEvent.x, y: el.y + this.lastSeen.y - e.nativeEvent.y}) : el
        // })
        // });
        console.log('onMouseMove', newPos, this.state.toggledCard);
        todo['setCardPosition'].setCardPosition(store, newPos, this.state.toggledCard);



        this.lastSeen.x = e.nativeEvent.x;
        this.lastSeen.y = e.nativeEvent.y;
        //this.setState({ cardPositions[]: { x: this.lastSeen.x - e.screenX, y: this.lastSeen.y - e.screenY}});
    }

    updateMouse(lastSeen, cardNum, inPlay) {
        let status = !this.state.toggled ? true : false;
        // this.toggledCard = status ? cardNum : null;
        this.lastSeen.x = lastSeen.x;
        this.lastSeen.y = lastSeen.y;
        console.log('inside updateMouse', status);
        this.setState({toggled: status, toggledCard: status ? cardNum : null});
        // check if moved correctly
        // if(!status && !inPlay) {
        //     if(this.state.cardPositions[cardNum].y > 100) {
        //         let copy = this.state.cardPositions.slice();
        //         let temp = JSON.parse(JSON.stringify(copy.splice(cardNum, 1)[0]));
                
        //         console.log('item to keep', temp);
        //         console.log('changing item property');
        //         temp.status = true;
        //         console.log('item to keep after change', temp);
        //         console.log('item in the list:', copy[cardNum]);
        //         console.log('copy after', copy);
        //         this.setState({
        //             toggled: status, 
        //             selectedCard: cardNum,
        //             cardsInPlay: this.state.cardsInPlay.concat(temp),
        //             cardPositions: copy
        //             }, () => {
        //                 this.getNewInPlayPosition();
        //         });
                
        //     }
        // } else {
        //     this.setState({toggled: status, selectedCard: cardNum});
        // }
    }

    getNewInPlayPosition(){
        let copy = this.state.cardsInPlay.slice();
        copy[0].x = -this.firstPos(copy.length ? copy.length : 1, true);
        console.log(copy[0]);
        copy[0].y = -200;
        for(let i = 1; i < copy.length; i++) {
            copy[i].x = copy[0].x - (i * (150 + 20));
            copy[i].y = -200;
        }

        this.setState({cardsInPlay: copy});
    }

    render() {
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
