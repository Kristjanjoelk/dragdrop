const socketIO = function (socket) {
    return function () {
        return function (next) {
            return function (action) {
                console.log('Coolio action:', action);
                function callback(res) {
                    console.log('RESULTS', res);
                }
                if (action.meta && action.meta.socket && action.meta.socket.channel) {
                    socket.emit(action.meta.socket.channel, action, function(res) {
                        console.log('err, res', res);
                        let newAction = Object.assign(action, {data: { option: { isLoggedIn: res}}});
                        console.log(newAction, action);
                        return next(newAction);
                    });
                }

                
            };
        };
    };
};
export default socketIO;