import Info from '../../unit/Info';

const initState = (() => {
    const option = {
        gameList: [],
    };
    return new Info(option);
})();

const info = (state = initState, action) => {
    console.log('setinfo state', state);
    switch (action.type) {
        case 'setInfo':
            return action.data;
        default:
            return state;
    }
};

export default info;