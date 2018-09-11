import Game from '../../unit/Game';

const initState = (() => {
    const option = {
        cardsOnBoard: []
    };
    return new Game(option);
})();

const game = (state = initState, action) => {
    switch (action.type) {
        case 'createGame':
            return action.data;
        default:
            return state;
    }
};

export default game;