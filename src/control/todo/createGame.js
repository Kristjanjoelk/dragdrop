import actions from '../../actions';

const createGame = (store) => {
    if (store.getState().get('game') !== null) {
        const state = store.getState();

        const curAuth = state.get('auth');
        const curGame = state.get('game');
        if(curGame && curAuth) {
            console.log('curAuth', curAuth);
            const nextAuth = curAuth.setInGame();
            const nextGame = curGame.createGame();
            store.dispatch(actions.createGame(nextGame));
            store.dispatch(actions.setInGame(nextAuth));
        } else {
            console.log('something wrong with curGame', curGame);
        }
    }
    return;
  };
  
  
  export default {
    createGame,
  };
  