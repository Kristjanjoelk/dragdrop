import actions from '../../actions';

const setCardPosition = (store, card) => {
        if (store.getState().get('container') !== null) {
            const state = store.getState();
            const curContainer = state.get('container');
            // console.log('state', state);
            if(curContainer) {
                const nextContainer = curContainer.cancelCard(card);
                console.log(nextContainer);
                if(nextContainer === -1) {
                    return;
                }
                if(nextContainer.inPlay === -1) {
                    nextContainer.inPlay = [];
                }
                store.dispatch(actions.cancelCard(nextContainer));
            } else {
                // console.log('something wrong with curContainer when setting card position', curContainer);
            }
        }
        return;
};


export default {
    setCardPosition,
};

