import { combineReducers } from 'redux-immutable';
import card from './card';
import container from './container';
import auth from './auth';
import info from './info/info';

const rootReducer = combineReducers({
    card,
    container,
    auth,
    info
});

export default rootReducer;
