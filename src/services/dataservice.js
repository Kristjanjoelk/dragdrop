import io from 'socket.io-client';
const setupSocket = () => {
    const socket = new io('http://localhost:3000');

    socket.on('connect', function (data) {
        console.log('eureka!!');
    });
    return socket
}


const createMySocketMiddleware = () => {
    return storeAPI => {
        let socket = setupSocket();

        socket.on("message", (message) => {
            // storeAPI.dispatch({
            //     type : "SOCKET_MESSAGE_RECEIVED",
            //     payload : message
            // });
        });

        return next => action => {
            // if(action.type == "SEND_WEBSOCKET_MESSAGE") {
            //     socket.send(action.payload);
            //     return;
            // }

            return next(action);
        }
    }
}

export default createMySocketMiddleware