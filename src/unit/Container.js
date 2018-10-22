class Card {
    constructor(option) {
        this.id = option.id;
        this.cLocation = option.cLocation;
        this.pLocation = option.pLocation;
        this.text = option.text;
        this.year = option.year;
        this.canCancel = option.canCancel;
        this.dummy = option.dummy ? option.dummy : false;
        this.color = option.color ? option.color : this.initColor();
    }

    initColor() {
        return {
            R: this.getRandomInt(),
            G: this.getRandomInt(),
            B: this.getRandomInt()
        }
    }

    getRandomInt() {
        return Math.floor(Math.random() * Math.floor(255));
    }
}

class Container {
    constructor(option) {
        this.inHand = option.inHand;
        this.inPlay = option.inPlay;
        this.inHandCounter = option.inHandCounter;
        this.inPlayCounter = option.inPlayCounter;

    //   // Because we dont want to init after finishin all cards
    //   if(this.option.inHand !== -1 && !this.option.inHand.length) {
    //       this.option.inHand = this.initPositions();
    //   }
    //   if(this.option.inHand === -1) {
    //     this.option.inHand = [];
    //   } 
    //   else {
    //       this.option.inHand = this.option.inHand;
    //   }
    }
    // inHand: [],
    // inPlay: [],
    // inHandCounter: 5,
    // inPlayCounter: 0
    initializeContainer(cardsOnBoard, cardsInHand) {
        // TODO: if rejoining, check if cardsOnBoard.length > 1
        let newInPlay = this.generatePositions(true, null, cardsOnBoard[0]);
        let newInHand = this.generateManyPositions(false, null, cardsInHand);
        console.log('doing that thing where I initialize cards');
        console.log('NewinHand:', newInHand);
        console.log('newInplay', newInPlay);
        return {
            inHand: newInHand,
            inPlay: newInPlay,
            inHandCounter: 5,
            inPlayCounter: 0
        }
    }

    generateManyPositions(inPay, _cards, newCards) {
        let yPos = -20;
        let length = 5;
        let firstPos = this.firstPos(length);
        let cardsToReturn = [];

        for(let i = 0; i < newCards.length; i++) {
            let currentCard = newCards[i];
            
            cardsToReturn.push(new Card({
                id: currentCard.id, 
                text: currentCard.text,
                year: currentCard.year,
                cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                canCancel: false
            }));
        }
        console.log('cards created: ', cardsToReturn);
        return cardsToReturn;
    }

    generatePositions(inPlay, _cards, newCard) {
        if(!_cards && !newCard) {
            return -1;
        }
        let yPos = inPlay ? -200 : -20;
        let length = _cards ? _cards.length : 1;
        let firstPos = this.firstPos(length, true);
        let cards = [];
        let i = 0;

        if(!_cards) {
            cards.push(new Card({
                id: newCard.id, 
                cLocation: {'x': -firstPos, 'y': yPos }, 
                pLocation: {'x': -firstPos, 'y': yPos },
                canCancel: newCard.canCancel,
                dummy: newCard.dummy,
                color: newCard.color
            }));
            return cards;
        }

        for (i; i < length; i++) {
            let currCard = _cards[i];
            if(currCard.dummy && this.option.hasGap) {
                cards.push(new Card({
                    id: newCard.id, 
                    cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                    pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                    canCancel: newCard.canCancel,
                    dummy: newCard.dummy,
                    color: newCard.color
                }));
            } else {
                cards.push(new Card({
                    id: currCard.dummy ? i : currCard.id, 
                    cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                    pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                    canCancel: currCard.dummy ? false : currCard.canCancel,
                    dummy: currCard.dummy,
                    color: currCard.color
                }));
            }
           
        }
        console.log('cards created from generatePositions: ', cards);
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
            pLocation: {'x': -firstPos, 'y': yPos},
            canCancel: false
        }));
        let i = 1;
        for (i; i < length; i++) {
            cards.push(new Card({
                id: i, 
                cLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos }, 
                pLocation: {'x': -firstPos - (i * (150 + 20)), 'y': yPos },
                canCancel: false
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
         
        if(!this.option.hasGap && (card.cLocation.y > 425 && card.cLocation.y < 600)) {
            if(this.option.inPlay.length > 0) {
                newInPlay = this.generatePositions(true, this.createGapAtIndex(this.findGapIndex(card), this.option.inPlay));
                _hasGap = true;
            }
        }  
        else if(this.option.hasGap && !(card.cLocation.y > 425 && card.cLocation.y < 600)) {
            _hasGap = false;
            newInPlay = this.removeGap();
        } 
        else {
            _hasGap = this.option.hasGap;
        }

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
            return {
                inHand: this.generatePositions(false, this.option.inHand),
                inPlay: this.option.hasGap ? this.removeGap() : this.option.inPlay,
                inHandCounter: this.option.inHandCounter,
                inPlayCounter: this.option.inPlayCounter,
                hasGap: this.option.hasGap
            };
        }

        card.canCancel = true;
        let newInPlayArray = this.generatePositions(true, this.option.inPlay, card);
        // let newInPlayArray = this.option.hasGap ? this.generatePositions(true, this.removeGap(this.option.inPlay.concat(card))) : this.generatePositions(true, this.option.inPlay.concat(card));
        let newInHandArray = this.generatePositions(false, this.option.inHand.filter((_card) => { return _card.id !== card.id }));
        // let index = this.findHand(true);
        return {
            inHand: newInHandArray,
            inPlay: newInPlayArray,
            inHandCounter: this.option.inHandCounter - 1,
            inPlayCounter: this.option.inPlayCounter + 1,
            hasGap: this.option.hasGap
        };
    }
    
    addOneGapToInPlay(rightSide) {
        if(this.option.inPlay.length > 1) {
            return this.option.inPlay.slice();
        }
        if(rightSide) {
            return this.option.inPlay.concat(new Card({ dummy: true }));
        } else {
            return this.option.inPlay.slice().unshift(new Card({ dummy: true }))
        }
    }
    // return index + 1 of the card.
    findGapIndex(_card) {
        let index = 0;
        for(let i = 0; i < this.option.inPlay.length; i++) {
            let currCard = this.option.inPlay[i];
            // console.log('comparing', _card.cLocation.x, 'to', currCard.cLocation.x);
            if(_card.cLocation.x < currCard.cLocation.x) {
                index = i + 1;
            }
        }

        // console.log('gap index should be, ', index);
        return index;
    }
    createGapAtIndex(index, arr) {
        if(index === 0) {
            let temp = arr.slice();
            temp.unshift(new Card({ dummy: true }));
            // console.log('returning when index is 0', temp);
            return temp;
        };
    
        var first = arr.slice(0, index);
        var second = arr.slice(index, arr.length);
        first.push(new Card({ dummy: true }));
        let temp = first.concat(second);
        // console.log('returning when index is', index, temp);
        return temp;
    };

    removeGap(arr) {
        if(arr) {
            return arr.filter((card) => {
                return !card.dummy;
            });
        }
        // console.log('removing gap', this.option.inPlay);
        return this.option.inPlay.filter((card) => {
            return !card.dummy;
        });
    }

    cancelCard(cardToCancel) {
        cardToCancel.canCancel = false;
        // if(this.option.inPlay.length > 1) {
        //     newInPlayArray = this.generatePositions(true, this.option.inPlay.filter((card) => { return card.id !== cardToCancel.id }));
        // } else {
        //     newInPlayArray = this.option.inPlay.filter((card) => { return card.id !== cardToCancel.id });
        // }
        return {
            inHand: this.generatePositions(false, this.option.inHand.concat(cardToCancel)),
            inPlay: this.generatePositions(true, this.option.inPlay.filter((card) => { return card.id !== cardToCancel.id })),
            inHandCounter: this.option.inHandCounter + 1,
            inPlayCounter: this.option.inPlayCounter - 1,
            hasGap: this.option.hasGap
        };
    }
  }
  
  export default Container;