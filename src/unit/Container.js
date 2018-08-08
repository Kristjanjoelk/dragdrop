class Card {
    constructor(option) {
        this.id = option.id;
        this.cLocation = option.cLocation;
        this.pLocation = option.pLocation;
        this.canCancel = true;
        this.dummy = option.dummy ? option.dummy : false;
        console.log(option);
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

      // Because we dont want to init after finishin all cards
      if(this.option.inHand !== -1 && !this.option.inHand.length) {
          this.option.inHand = this.initPositions();
      }
      if(this.option.inHand === -1) {
        this.option.inHand = [];
      } 
      else {
          this.option.inHand = this.option.inHand;
      }
    }
    generatePositions(inPlay, _cards) {
        if(!_cards.length) {
            return -1;
        }
        let yPos = inPlay ? -200 : -20;
        let length = _cards.length;
        let firstPos = this.firstPos(length, true);

        // console.log('first pos', firstPos);
        let cards = [];
        cards.push(new Card({
            id: _cards[0].dummy ? 0 : _cards[0].id, 
            cLocation: {'x': -firstPos, 'y': yPos}, 
            pLocation: {'x': -firstPos, 'y': yPos},
            canCancel: true,
            dummy: _cards[0].dummy
        }));


        let i = 1;
        for (i; i < length; i++) {
            let currCard = _cards[i];
            cards.push(new Card({
                id: currCard.dummy ? i : currCard.id, 
                cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                canCancel: currCard.canCancel,
                dummy: currCard.dummy
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
        // console.log('cards created: ', cards);
        return cards;
    }

    firstPos(nCards, inPlay) {
        let width = 1080;
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

        let newInPlay = false;
        let _hasGap = false;

        // #### Fancy ####
        // 1. detect if card is hovering over other cards
        // 2. move other cards if so
        // console.log('card.y', card.cLocation.y);
        // console.log('card.x', card.cLocation.x);
        if(card.cLocation.y > 425 && card.cLocation.y < 600) {
            if(this.option.inPlay.length > 0) {
                newInPlay = this.generatePositions(this.createGapAtIndex(this.findGapIndex(card)));
                // console.log('sweet spot!!', card.cLocation.x, this.option.inPlay[0].cLocation.x);
                // if(card.cLocation.x < this.option.inPlay[0].cLocation.x ) {
                //     newInPlay = this.generatePositions(true, this.addOneGapToInPlay(true));
                // } else {
                //     newInPlay = this.generatePositions(true, this.addOneGapToInPlay(false));
                // }
                _hasGap = true;
            }
        }

        // console.log('newArray', newArray);

        // 2. update cards if new pos affects them

        return {
            inHand: newArray,
            inPlay: newInPlay ? newInPlay : this.option.inPlay,
            inHandCounter: this.option.inHandCounter,
            inPlayCounter: this.option.inPlayCounter,
            hasGap: _hasGap
        };
    }


    permaMoveCard(card) {
        // 1. decide if card should be moved
        // console.log('Moving card with ', card);
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
    
    addOneGapToInPlay(rightSide) {
        if(this.option.inPlay.length > 1) {
            return this.option.inPlay.slice();
        }
        if(rightSide) {
            return this.option.inPlay.concat(new Card({option: { dummy: true }}));
        } else {
            return this.option.inPlay.slice().unshift(new Card({option: { dummy: true }}))
        }
    }

    findGapIndex(_card) {
        let index = 0;
        for(let i = 0; i < this.option.inPlay.length; i++) {
            let currCard = this.option.inPlay[i];
            console.log('comparing', _card.cLocation.x, 'to', currCard.cLocation.x);
            if(_card.cLocation.x > currCard.cLocation.x) {
                index = i + 1;
            }
        }

        console.log('gap index should be, ', index);
        return index;
    }

    createGapAtIndex(index) {
        if(index === -1) {
            console.log('index for gap is wrong, fix me');
            return -1;
        }
        let newArray = this.option.inPlay.slice();
        newArray[index] = new Card({option: { dummy: true }});
        console.log('created gap at index', index, newArray);
        return newArray;
    }
  }
  
  export default Container;