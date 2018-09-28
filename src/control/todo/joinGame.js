import actions from '../../actions';

const joinGame = (store, game) => {
    if (store.getState().get('game') !== null) {
        const state = store.getState();

        const curAuth = state.get('auth');
        const curGame = state.get('game');
        if(curGame && curAuth) {
            console.log('curAuth', curAuth);
            const nextAuth = curAuth.setInGame();
            const nextGame = curGame.joinGame(game);
            store.dispatch(actions.joinGame(nextGame, game));
            console.log(nextGame);
            store.dispatch(actions.setInGame(nextAuth));
        } else {
            console.log('something wrong with curGame', curGame);
        }
    }
    return;
  };
  
  
  export default {
    joinGame,
  };
  