import Container from '../components/container/container';
import Column from '../components/column/column';
import CardWidget from '../components/cardWidget/cardWidget';
import Card from '../components/card/card';

const container = new Container(document.body);
const column = new Column(document.querySelector('main'));

const columns = ['todo', 'in progress', 'done'];
columns.forEach((el) => column.addColumn(el));

const cardWidget = new CardWidget();
const card = new Card();
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
card.renderCardElement(document.querySelector('.column-main'));
