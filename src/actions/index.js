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

const setUserName = (option) => {
    console.log('setusername options:', option);
    return {
        type: 'setUserName',
        data: new Auth(option),
        meta: {
            socket: {
                channel: 'messagefromapp',
            },
        }
    };
}

function getInfo(option) {
    return {
        type: 'getInfo',
        data: new Info(option),
        meta: {
            socket: {
                channel: 'messagefromapp',
            },
        }
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

function joinGame(option, game) {
    return {
        type: 'joinGame',
        data: new Game(option),
        gameNumber: game,
        meta: {
            socket: {
                channel: 'messagefromapp',
            },
        }
    };
}

function generatePositions(option, game) {
    return {
        type: 'joinGame',
        data: new Game(option),
        gameNumber: game,
        meta: {
            socket: {
                channel: 'messagefromapp',
            },
        }
    };
}

function setInGame(option) {
    return {
        type: 'setInGame',
        data: new Auth(option)
    };
}

export default {
    moveCard,
    permaMoveCard,
    cancelCard,
    setUserName,
    getInfo,
    createGame,
    setInGame,
    joinGame
};