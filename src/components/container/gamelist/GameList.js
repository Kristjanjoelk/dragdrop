import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import store from '../../../store';
import todo from '../../../control/todo';
import './GameList.css';

class Login extends Component {
    constructor(props) {
        super(props);
        console.log('gameList props:', props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inside handle submit for list container');

        todo['createGame'].createGame(store, function(err, res) {
            console.log('err creating game', err);
            console.log('res creating game', res);
        });
    };
    render() {
        return (

            <div className='game-list-container'>

                Hello world from GAME LIST CONTAINER
                { !this.props.info.option.gameList || (!this.props.info.option.gameList.length && 
                    <div>

                        No games are available
                        <form onSubmit={this.handleSubmit} >
                        <button type="submit"> Create game </button></form>
                    </div>
                )}
                { this.props.info.option.gameList && this.props.info.option.gameList.length && 
                    this.props.container.option.gameList.map(function(game, i) {
                        return <div key={i.toString()}> Game # {i} <button> Join game </button> </div>;
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

export default Login;