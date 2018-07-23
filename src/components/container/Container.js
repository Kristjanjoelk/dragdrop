import React, { Component } from 'react';
import Card from '../card/Card';
import './Container.css';


class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggled: false,
            diff: {
                x: 0,
                y: 0
            }
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
        console.log('toggle status is', this.state.toggled);
        if(!this.state.toggled) {
            return;
        }      

        // 2. calculated x diff and y diff to see where the mouse moved
        // 3. apply to element

        this.setState({ diff: { x: this.lastSeen.x - e.screenX, y: this.lastSeen.y - e.screenY}});
    }

    updateMouse(lastSeen) {
        let status = !this.state.toggled ? true : false;
        this.setState({toggled: status});
        this.lastSeen.x = lastSeen.x;
        this.lastSeen.y = lastSeen.y;
    }

    render() {
        return (
            <div className='Icontainer' onMouseMove={this.onMouseMove}>
                <div className='CardContainer'>
                    <Card updateMouse={this.updateMouse} diff={this.state.diff}/>
                    THIS IS CARD CONTAINER
      </div>
                THIS IS CONTAINER
      </div>

        );
    }
}

export default Container;
