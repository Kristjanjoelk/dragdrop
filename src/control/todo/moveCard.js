import actions from '../../actions';

const moveCard = (store, card) => {
    console.log('moving card todo');
    if (store.getState().get('container') !== null) {
        const state = store.getState();
        const curContainer = state.get('container');
        console.log('state', state);
        if(curContainer) {
            const nextContainer = curContainer.moveCard(card);
            console.log(nextContainer);
            if(nextContainer === -1) {
                console.log('not doing anything with new Card');
                return;
            }
            store.dispatch(actions.moveCard(nextContainer));
        } else {
            console.log('something wrong with curContainer', curContainer);
        }
    }

  //   store.dispatch();
  //   if (store.getState().get('cur') !== null) {
  //     const state = store.getState();
  //     const cur = state.get('cur');
  //     const curLevel = state.get('level');
  //     if (cur !== null) {
  //       const next = cur.up(curLevel);
  //       const nextLevel = curLevel.addLocationValue(next);
  //       if (nextLevel === -1) {
  //         store.dispatch(actions.invalidMove(cur.invalidMove()));
  //         return;
  //       }
  //       store.dispatch(actions.movePlayer(next));
  //       store.dispatch(actions.addValue(nextLevel));
  //     }
  //   }
    return;
  };
  
  
  export default {
      moveCard,
  };
  
  