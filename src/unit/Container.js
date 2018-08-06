class Card {
    constructor(option) {
        this.id = option.id;
        this.cLocation = option.cLocation;
        this.pLocation = option.pLocation;
        this.canCancel = true;
    //   this = {
    //     id: option.id,
    //     cLocation: option.cLocation,
    //     pLocation: option.pLocation,
    //     canCancel: true
    //   }
    }
}

class Container {
    constructor(option) {
      this.option = option;
      if(!this.option.inHand.length) {
          this.option.inHand = this.initPositions();
      }
    }
    generatePositions(inPlay, _cards) {

        let yPos = inPlay ? -200 : -20;
        let length = _cards.length;
        let firstPos = this.firstPos(length, true);

        console.log('first pos', firstPos);
        let cards = [];
        cards.push(new Card({
            id: _cards[0].id, 
            cLocation: {'x': -firstPos, 'y': yPos}, 
            pLocation: {'x': -firstPos, 'y': yPos}
        }));
        let i = 1;
        for (i; i < length; i++) {
            let currCard = _cards[i];
            cards.push(new Card({
                id: currCard.id, 
                cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                canCancel: currCard.canCancel
            }));
        }
        console.log('cards created: ', cards);
        return cards;
    }

    initPositions() {
        let yPos = -20;
        let length = 5;
        let firstPos = this.firstPos(length);
        let cards = [];
        cards.push(new Card({
            id: 0, 
            cLocation: {'x': -firstPos, 'y': yPos}, 
            pLocation: {'x': -firstPos, 'y': yPos}
        }));
        let i = 1;
        for (i; i < length; i++) {
            cards.push(new Card({
                id: i, 
                cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                canCancel: true
            }));
        }
        console.log('cards created: ', cards);
        return cards;
    }

    firstPos(nCards, inPlay) {
        let width = inPlay ? 1080 : 970;
        if (nCards === 1) {
            return (width / 2) - 75;
        }
        return (width/2 - ((nCards * 170)/2));
    }

    moveCard(card) {
        // card has been moved
        // 1. update array for that card

        let newArray = this.option.inHand.map((_card) => {
            if(card.id === _card.id) {
                return card;
            }
            return _card;
        });

        console.log('newArray', newArray);

        // 2. update cards if new pos affects them

        return {
            inHand: newArray,
            inPlay: this.option.inPlay,
            inHandCounter: this.option.inHandCounter,
            inPlayCounter: this.option.inPlayCounter
        };
    }


    permaMoveCard(card) {
        // 1. decide if card should be moved
        console.log('Moving card with ', card);
        if(card.cLocation.y < 100) {
            console.log('should not move card');
            return -1;
        }

        let newInPlayArray = this.generatePositions(true, this.option.inPlay.concat(card));
        let newInHandArray = this.generatePositions(false, this.option.inHand.filter((_card) => { return _card.id !== card.id }));
        // let index = this.findHand(true);
        return {
            inHand: newInHandArray,
            inPlay: newInPlayArray,
            inHandCounter: this.option.inHandCounter - 1,
            inPlayCounter: this.option.inPlayCounter + 1
        };
    }

    // findHand(inHand) {
    //     let arr = inHand ? this.option.inHand : this.option.inPlay;
    //     for(let i = 0; i < arr.length; i++) {

    //     } 
    // }

    test(newValue) {
        console.log('New value from container unit', newValue);
        return {
            test: 'hello world'
        };
    }
  }
  
  export default Container;