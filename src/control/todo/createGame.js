import actions from '../../actions';

const createGame = (store, game) => {
    if (store.getState().get('game') !== null) {
        const state = store.getState();
        const curGame = state.get('game');
        if(curGame) {
            const nextGame = curGame.createGame(game);
            store.dispatch(actions.createGame(nextGame, game));
        } else {
            console.log('something wrong with curGame', curGame);
        }
    }
    return;
  };
  
  
  export default {
    createGame,
  };
  