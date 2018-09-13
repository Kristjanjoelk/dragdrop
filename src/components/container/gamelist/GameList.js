import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import store from '../../../store';
import todo from '../../../control/todo';
import PropTypes from 'prop-types';
import './GameList.css';

class GameList extends Component {
    constructor(props) {
        super(props);
        console.log('gameList props:', props);
    }
    handleCreate = (e) => {
        e.preventDefault();
        console.log('Inside handle submit for list container');

        todo['createGame'].createGame(store, function(res) {
            console.log('res creating game', res);
        });
    };
    componentDidCatch(error, info) {
        // Display fallback UI
        console.log('ERROR', error, info);
    }
    

    render() {
        console.log('PROPS:', this.props.info.option)
        return (

            <div className='game-list-container'>

                Hello world from GAME LIST CONTAINER
                { !this.props.info.option.gameList || (!this.props.info.option.gameList.length && 
                    <div>

                        No games are available
                        <form onSubmit={this.handleCreate} >
                        <button type="submit"> Create game </button></form>
                    </div>
                )}
                { this.props.info && this.props.info.option.gameList && this.props.info.option.gameList.length && 
                    this.props.info.option.gameList.map(function(game, i) {
                        return <div key={i.toString()}> Game # {i + 1}  <form onSubmit={this.handleJoin} >
                        <button type="submit"> Join game </button></form></div>;
                    }.bind(this))
                }
                <section>
                    <h3>users online</h3>
                    <ul>
                { this.props.info.option.userList && this.props.info.option.userList.length && 
                    this.props.info.option.userList.map(function(user, i) {
                        
                        return <li key={i.toString()}> {user} </li>;
                    }.bind(this))
                }
                    </ul>
                </section>
            </div>

        )
    }
}

GameList.propTypes = {
    info: PropTypes.object.isRequired
};
  

export default GameList;