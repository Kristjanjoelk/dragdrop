class Game {
    constructor(option) {
        this.option = option;
    }

    createGame(newGame) {
        return newGame;
    }
    
    joinGame(newGame) {
        console.log('the NEW Gae', newGame);
        return newGame;
    }
}
  
export default Game;