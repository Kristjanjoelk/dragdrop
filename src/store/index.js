
import io from 'socket.io-client';
import socketIO from '../services/socketRedux';
import { createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers';
import ReduxThunk from 'redux-thunk';



const store = createStore(rootReducer, applyMiddleware(ReduxThunk.withExtraArgument(io.connect('http://localhost:3000'))
    // socketIO(io.connect('http://localhost:3000')), 
));

export default store;