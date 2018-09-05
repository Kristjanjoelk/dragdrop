
import io from 'socket.io-client';
import socketIO from '../services/socketRedux';
import { createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers';



const store = createStore(rootReducer, applyMiddleware(
    socketIO(io.connect('http://localhost:3000'))
));

// const store = createStore(
//     rootReducer,
// );

export default store;