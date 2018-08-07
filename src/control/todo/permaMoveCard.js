import actions from '../../actions';

const permaMoveCard = (store, card) => {
    // console.log('permaMoveCard todo');
    if (store.getState().get('container') !== null) {
        const state = store.getState();
        const curContainer = state.get('container');
        // console.log('state', state);
        if(curContainer) {
            const nextContainer = curContainer.permaMoveCard(card);
            // console.log(nextContainer);
            if(nextContainer === -1) {
                console.log('not doing anything with new Card');
                return;
            }
            store.dispatch(actions.permaMoveCard(nextContainer));
        } else {
            // console.log('something wrong with curContainer', curContainer);
        }
    }
    return;
  };
  
  
  export default {
    permaMoveCard,
  };
  