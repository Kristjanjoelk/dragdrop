import React, { Component } from 'react';
import CardComponent from '../card/Card';
import {Card as _card} from '../../unit/Card.js';
import PropTypes from 'prop-types';
import GameList from './gamelist/GameList';
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

    render() {

        // console.log('this.props.container', this.props.container);
        return (
            
            <div className='Icontainer' onMouseMove={this.onMouseMove}>
                { !this.props.auth.option.isInGame && 
                    <GameList info={this.props.info}/> 
                }
                {   this.props.auth.option.isInGame && 
                        this.props.game.option.cardsOnBoard.map(function(position, i) {
                            return <CardComponent key={i.toString()} number={i} updateMouse={this.updateMouse} card={position}/>;
                    }.bind(this))
                }
                <div className='CardContainer'>
                { this.props.auth.option.isInGame &&
                    this.props.container.option.inHand.map(function(position, i) {
                        return <CardComponent key={i.toString()} number={i} updateMouse={this.updateMouse} card={position}/>;
                    }.bind(this))
                }
                THIS IS CARD CONTAINER
      </div>
                THIS IS CONTAINER
      </div>

        );
    }
}

Container.propTypes = {
    info: PropTypes.object.isRequired
};

export default Container;
