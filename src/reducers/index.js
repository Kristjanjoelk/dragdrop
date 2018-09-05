import { combineReducers } from 'redux-immutable';
import card from './card';
import container from './container';
import auth from './auth';

const rootReducer = combineReducers({
    card,
    container,
    auth
});

export default rootReducer;
