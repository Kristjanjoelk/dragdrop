const socketIO = function (socket) {
    return function () {
        return function (next) {
            return function (action) {
                console.log('Coolio action:', action);
                if (action.meta && action.meta.socket && action.meta.socket.channel) {
                    
                    switch (action.type) {
                        case 'setUserName': {
                            socket.emit(action.meta.socket.channel, action, function(res) {
                                console.log('ACTION before', action);
                                let newOption = Object.assign(action.data.option, {isLoggedIn: true});
                                action.data.option = newOption;
                                console.log('ACTION option after', newOption);
                                return next(action);
                            });
                            break;
                        };
                        case 'getInfo': {
                            console.log('emitting set info', action.type);
                            socket.emit(action.meta.socket.channel, action, function(res) {
                                let newAction = Object.assign(action, {data: { option: { gameList: res.gameList, userList: res.userList}}});
                                console.log('new ACTION', newAction);
                                return next(newAction);
                            });
                            break;
                        };
                        case 'createGame': {
                            console.log('emitting create game', action.type);
                            socket.emit(action.meta.socket.channel, action, function(res) {
                                // let newAction = Object.assign(action, {data: { option: { gameList: res.gameList, userList: res.userList}}});
                                let newOption = Object.assign(action.data.option, { gameList: res.gameList, userList: res.userList});
                                action.data.option = newOption;
                                console.log('new option', newOption);
                                return next(action);
                            });
                            break;
                        };

                        case 'joinGame': {
                            console.log('emitting join game', action);
                            socket.emit(action.meta.socket.channel, action, function(res) {
                                console.log('join game res:', res);
                                action.data.option = {
                                    cardsOnBoard: res.cardsOnBoard, userList: res.userList
                                };
                                console.log('new action', action);
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