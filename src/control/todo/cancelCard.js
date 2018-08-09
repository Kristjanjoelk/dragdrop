import actions from '../../actions';

const cancelCard = (store, card) => {
    // console.log('permaMoveCard todo');
    if (store.getState().get('container') !== null) {
        const state = store.getState();
        const curContainer = state.get('container');
        // console.log('state', state);
        if(curContainer) {
            const nextContainer = curContainer.cancelCard(card);
            console.log(nextContainer);
            if(nextContainer === -1) {
                // console.log('not doing anything with new Card');
                return;
            }

            if(nextContainer.inPlay === -1) {
                nextContainer.inPlay = [];
            }
            store.dispatch(actions.cancelCard(nextContainer));
        } else {
            // console.log('something wrong with curContainer', curContainer);
        }
    }
    return;
  };
  
  
  export default {
    cancelCard,
  };
  