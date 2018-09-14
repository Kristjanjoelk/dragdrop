import Game from '../../unit/Game';

const initState = (() => {
    const option = {
        cardsOnBoard: [],
        userList: []
    };
    return new Game(option);
})();

const game = (state = initState, action) => {
    switch (action.type) {
        case 'createGame':
        case 'joinGame':
            return action.data;
        default:
            return state;
    }
};

export default game;