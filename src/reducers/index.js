import { combineReducers } from 'redux-immutable';
import card from './card';
import container from './container';

const rootReducer = combineReducers({
    card,
    container
});

export default rootReducer;
