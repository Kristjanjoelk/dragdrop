import Container from '../unit/Container';
import Auth from '../unit/Auth';
import Card from '../unit/Card';
import Game from '../unit/Game';
import Info from '../unit/Info';

function moveCard(option) {
    return {
        type: 'moveCard',
        data: new Container(option),
    };
}

function permaMoveCard(option, card) {
    return {
        type: 'permaMoveCard',
        data: new Container(option),
        card: card,
        meta: {
            socket: {
                channel: 'permamovecard',
            },
        }
    };
}

function cancelCard(option) {
    return {
        type: 'cancelCard',
        data: new Container(option),
    };
}

const setUserName = (username, auth) => {
    return (dispatch, getState, socket) => {
        let data = {
            auth: auth,
            payload: username,
            type: 'setUserName'
        }
        socket.emit('messagefromapp', data, function(res) {
            if(res) {
                dispatch(_setUserName(auth.setUserName(username)));
                dispatch(getInfo());
            }
        });
    };
}

const _setUserName = (option) => {
    return {
        type: 'setUserName',
        data: new Auth(option)
    };
}

function getInfo() {
    return (dispatch, getState, socket) => {
        let data = {
            type: 'getInfo'
        }
        socket.emit('messagefromapp', data, function(res) {
            if(res) {
                console.log('setting info', res);
                dispatch(_getInfo(res));
            }
        });
    };
}

function _getInfo(option) {
    return {
        type: 'getInfo',
        data: new Info(option),
    };
}

function createGame(option) {
    return {
        type: 'createGame',
        data: new Game(option),
        meta: {
            socket: {
                channel: 'messagefromapp',
            },
        }
    };
}

function _joinGame(option) {
    console.log('inside _join game. . .. . . .');
    return {
        type: 'joinGame',
        data: new Game(option)
    };
}

function joinGame(option, game) {
    return (dispatch, getState, socket) => {
        let data = {
            type: 'joinGame',
            gameNumber: game
        }
        socket.emit('messagefromapp', data, function(res) {
            if(res) {
                console.log('join game res:', res);
                dispatch(initializeContainer(res.cardsOnBoard, res.cardsOnHand));
                dispatch(_joinGame(res));
            }
        });
    };
}

function initializeContainer(cardsOnBoard, cardsOnHand) {
    let newContainer = new Container({});
    console.log('initializeContainer');
    return {
        type: 'initializeContainer',
        data: new Container(newContainer.initializeContainer(cardsOnBoard, cardsOnHand))
    };
}

function setInGame(option) {
    return {
        type: 'setInGame',
        data: new Auth(option)
    };
}

function test(option) {
    console.log('nice!', option);
    return {
        type: 'test',
        data: new Auth(option)
    };
}

function setUser(action) {
    console.log('inside SETUSER action');
    action = {};
    action.type = 'test';
    return (dispatch, getState, socket) => {
      // you can use api here
      socket.emit('messagefromapp', action, function(res) {
        console.log('ACTION before', action);
        // let newOption = Object.assign(action.data.option, {isLoggedIn: true});
        // action.data.option = newOption;
        // console.log('ACTION option after', newOption);
        return dispatch(test(res));
    });
    }
  }

export default {
    moveCard,
    permaMoveCard,
    cancelCard,
    setUserName,
    getInfo,
    createGame,
    setInGame,
    joinGame,
    setUser
};