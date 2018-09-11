import { combineReducers } from 'redux-immutable';
import card from './card';
import container from './container';
import auth from './auth';
import info from './info/info';
import game from './game/game';

const rootReducer = combineReducers({
    card,
    container,
    auth,
    info,
    game
});

export default rootReducer;
