import Container from '../unit/Container';
import Card from '../unit/Card';

function moveCard(option) {
    console.log('inside move card actions!!');
    return {
      type: 'moveCard',
      data: new Container(option),
    };
}

function setCardPosition(option) {
    console.log('inside setCardPosition actions!!');
    return {
      type: 'moveCard',
      data: new Card(option),
    };
}
  

export default {
    moveCard
};