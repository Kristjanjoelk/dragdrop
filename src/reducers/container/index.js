import Container from '../../unit/Container';

const initState = (() => {
    const option = {
        inHand: [],
        inPlay: [],
        inHandCounter: 0,
        inPlayCounter: 0
    };



    console.log('inside initstate');
    return new Container(option);
})();

const container = (state = initState, action) => {
    console.log('container state:', state, 'action:', action);
    switch (action.type) {
        case 'moveCard':
            return action.data;
        default:
            return state;
    }
};

export default container;