import Auth from '../../unit/Auth';

const initState = (() => {
  const option = {
    isLoggedIn: false,
    isInGame: false,
    name: ''
  };
  return new Auth(option);
})();

const reducer = (state = initState, action) => {
   switch (action.type) {
    case 'setUserName':
      return action.data;
    // case reducerType.LOG_OUT:
    //   return Object.assign({}, action.data, {isLoggedIn: false});
    // case reducerType.SET_USER:
    //   return Object.assign({}, action.data, {isLoggedIn: true});
    default:
      return state;
  }
};

export default reducer;