import Container from '../unit/Container';
import Card from '../unit/Card';

function moveCard(option) {
    return {
      type: 'moveCard',
      data: new Container(option),
    };
}

function permaMoveCard(option) {
    return {
      type: 'permaMoveCard',
      data: new Container(option),
    };
}

function cancelCard(option) {
    return {
      type: 'cancelCard',
      data: new Container(option),
    };
}

export default {
    moveCard,
    permaMoveCard,
    cancelCard
};