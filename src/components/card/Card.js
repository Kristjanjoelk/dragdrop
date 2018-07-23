import React, { Component } from 'react';
import './Card.css';


class Card extends Component {
    constructor(props) {
        super(props);
        this.size = {
            width: 100,
            height: 200
        }
        
        this.lastSeen = {
            x: null,
            y: null,
        }

        this.diff = {
            x: 0,
            y: 0
        }

        this.state = {
            position: {
                x: 0,
                y: 0,
            }
        } 
        this.onClickCard = this.onClickCard.bind(this);
        // this.onMouseMove = this.onMouseMove.bind(this);
        console.log('hello: ', this.props.test);
    }

    onClickCard(e) {

        if(!this.lastSeen.x) {
            // 1. Get mouse position when clicked
            this.lastSeen = {
                x: e.screenX,
                y: e.screenY
            }
        }


        this.props.updateMouse(this.lastSeen);

        // 1b. let parent countainer know

        // this.setState({toggled: status});

        console.log('Mouse initial Coords, x:', this.lastSeen.x, 'y:', this.lastSeen.y);
    }

    // onMouseMove(e) {
    //     if(!this.props.toggled) {
    //         return;
    //     }       
    //     // 2. calculated x diff and y diff to see where the mouse moved
        
    //     this.diff.x = this.lastSeen.x - e.screenX;
    //     this.diff.y = this.lastSeen.y - e.screenY;
    //     // 3. apply to element

    //     this.setState({ position: { x: -this.diff.x, y: -this.diff.y}});
    // }

    render() {
        return (
            <div className='Card' onMouseDown={this.onClickCard} onMouseUp={this.onMouseLeave} onMouseMove={this.onMouseMove}
            style={{position: 'absolute', left: -this.props.diff.x, top: -this.props.diff.y}}> 
            THIS IS CARD
            <br/> x : {this.state.position.x}
            <br/> y : {this.state.position.y}
             </div>
        );
    }
}

export default Card;
