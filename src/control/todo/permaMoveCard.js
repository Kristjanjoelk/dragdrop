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
            if(nextContainer.inPlay === -1) {
                nextContainer.inPlay = [];
            }
            store.dispatch(actions.permaMoveCard(nextContainer, card));
        } else {
            // console.log('something wrong with curContainer', curContainer);
        }
    }
    return;
  };
  
  
  export default {
    permaMoveCard,
  };
  