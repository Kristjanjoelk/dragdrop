import Info from '../../unit/Info';

const initState = (() => {
    const option = {
        gameList: [],
        userList: []
    };
    return new Info(option);
})();

const info = (state = initState, action) => {
    console.log('getInfo state', state);
    switch (action.type) {
        case 'getInfo':
            return action.data;
        // case 'setInfo':
        //     return action.data;
        default:
            return state;
    }
};

export default info;