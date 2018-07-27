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
          this.option.inHand = this.generatePositions();
      }
    }
    generatePositions() {
        let length = 5;
        let firstPos = this.firstPos(length);
        let cards = [];
        cards.push(new Card({
            id: 0, 
            cLocation: {'x': -firstPos, 'y': -20}, 
            pLocation: {'x': -firstPos, 'y': -20}
        }));
        for (let i = 1; i < length; i++) {
            cards.push(new Card({
                id: i, 
                cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': -20 }, 
                pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': -20 }
            }));
        }
        console.log('cards created: ', cards);
        return cards;
    }

    firstPos(nCards, inPlay) {
        let width = inPlay ? 1080 : 870;
        if (nCards === 1) {
            return (width - 20) / 2;
        }
        return (width - ((nCards * 170)));
    }

    moveCard(card) {
        // 1. decide if card should be moved
        console.log('Moving card with ', card);
        if(card.cLocation.y > 100) {
            console.log('Should move card');
        } else {
            console.log('should not move card');
            return -1;
        }
        // let index = this.findHand(true);
        return {
            inHand: this.option.inHand.filter((_card) => { return _card.id !== card.id }),
            inPlay: this.option.inPlay.concat(card),
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