import Container from '../unit/Container';
import Auth from '../unit/Auth';
import Card from '../unit/Card';
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

function setInfo(option) {
    return {
        type: 'setInfo',
        data: new Info(option),
        meta: {
            socket: {
                channel: 'getinfo',
            },
        }
    };
}

export default {
    moveCard,
    permaMoveCard,
    cancelCard,
    setUserName,
    setInfo
};