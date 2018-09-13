import actions from '../../actions';

const setInfo = (store, info) => {
    if (store.getState().get('info') !== null) {
        const state = store.getState();
        const curInfo = state.get('info');
        if(curInfo) {
            const nextInfo = curInfo.setInfo(info);
            store.dispatch(actions.setInfo(nextInfo, info));
        } else {
            console.log('something wrong with curInfo', curInfo);
        }
    }
    return;
  };
  
  
  export default {
    setInfo,
  };
  