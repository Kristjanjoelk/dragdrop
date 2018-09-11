import actions from '../../actions';

const getInfo = (store, info) => {
    if (store.getState().get('info') !== null) {
        const state = store.getState();
        const curInfo = state.get('info');
        if(curInfo) {
            const nextInfo = curInfo.getInfo(info);
            store.dispatch(actions.getInfo(nextInfo, info));
        } else {
            console.log('something wrong with curInfo', curInfo);
        }
    }
    return;
  };
  
  
  export default {
    getInfo,
  };
  