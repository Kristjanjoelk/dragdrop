import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
// import store from '../../store';
// import todo from '../../control/todo';
import './GameList.css';

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inside handle submit for list container');
    };
    render() {
        return (
            <div className='game-list-container'>
                Hello world from GAME LIST CONTAINER
            </div>
        )
    }
}

export default Login;