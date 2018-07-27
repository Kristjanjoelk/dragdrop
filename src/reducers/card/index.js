import Card from '../../unit/Card';

const initState = (() => {
  const option = {
    id: -1,
    cLocation: { // current Location
      x: 0,
      y: 0,
    },
    pLocation: { // previous location: if canceled, we can move the card to its previous location
      x: 0,
      y: 0
    },
    canCancel: true, // default value is true because all cards start in hand
  };
  console.log('inside initstate');
  return new Card(option);
})();

const card = (state = initState, action) => {
  console.log('card state:', state, 'action:', action);
  switch (card.type) {
    case 'setCardPosition':
      return action.data;
    default:
      return state;
  }
};

export default card;