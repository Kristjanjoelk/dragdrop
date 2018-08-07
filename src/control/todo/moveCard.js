import actions from '../../actions';

const moveCard = (store, card) => {
    // console.log('moving card todo');
    if (store.getState().get('container') !== null) {
        const state = store.getState();
        const curContainer = state.get('container');
        // console.log('state', state);
        if(curContainer) {
            // console.log('THE CARD IM SUPPOSED TO MOVE', card);
            const nextContainer = curContainer.moveCard(card);
            // console.log(nextContainer);
            if(nextContainer === -1) {
                console.log('not doing anything with new Card');
                return;
            }
            store.dispatch(actions.moveCard(nextContainer));
        } else {
            console.log('something wrong with curContainer', curContainer);
        }
    }
    return;
  };
  
  
  export default {
      moveCard,
  };
  