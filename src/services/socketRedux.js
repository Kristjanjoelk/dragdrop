const socketIO = function (socket) {
    return function () {
        return function (next) {
            return function (action) {
                console.log('Coolio action:', action);
                if (action.meta && action.meta.socket && action.meta.socket.channel) {
                    
                    switch (action.type) {
                        case 'setUserName': {
                            socket.emit(action.meta.socket.channel, action, function(res) {
                                let newAction = Object.assign(action, {data: { option: { isLoggedIn: res}}});
                                return next(newAction);
                            });
                            break;
                        };
                        case 'setInfo': {
                            console.log('emitting set info', action.type);
                            socket.emit(action.meta.socket.channel, action, function(res) {
                                console.log('results from setInfo', res);
                                return next(action);
                            });
                            break;
                        };
                        default:
                            return next(action);
                    };

                    
                } else {
                    return next(action);
                }
            };
        };
    };
};
export default socketIO;