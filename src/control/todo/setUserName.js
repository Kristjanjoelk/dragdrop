import actions from '../../actions';

const setUserName = (store, username) => {
        if (store.getState().get('auth') !== null) {
            const state = store.getState();
            const curAuth = state.get('auth');
            // console.log('state', state);
            if(curAuth) {
                const nextAuth = curAuth.setUserName(username);
                console.log('nextAuth:', nextAuth);
                if(nextAuth === -1) {
                    return;
                }
                store.dispatch(actions.setUserName(nextAuth));
            } else {
                // console.log('something wrong with curContainer when setting card position', curContainer);
            }
        }
        return;
};


export default {
    setUserName,
};

