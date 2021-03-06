class Auth {
    constructor(option) {
        console.log("Creating new user: ", option);
        this.option = option;
    }

    setUserName(username) {
        return {
            isLoggedIn: this.option.isLoggedIn,
            name: username
        };
    }

    setInGame() {
        return {
            isLoggedIn: this.option.isLoggedIn,
            name: this.option.username,
            isInGame: true
        };
    }
}

export default Auth;