import './card.css';
import { getCardHtml } from './cardHtml';

export default class Card {
  constructor() {

    this.actualElement;
    this.draggedElement;
    
    this.onMouseDown = this.onMouseDown.bind(this);
    this.cardOnMouseDown = this.cardOnMouseDown.bind(this);

    document.body.addEventListener('mousedown', this.onMouseDown);
  }

  buildCardElement(title = 'Default title', description = 'Default description') {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = getCardHtml(title, description);

    console.log(cardElement);

    cardElement.querySelector('.delete').addEventListener('click', this.deleteOnClick);
    cardElement.addEventListener('mouseenter', this.cardElementMouseEnter);
    cardElement.addEventListener('mouseleave', this.cardElementMouseLeave);
    cardElement.addEventListener('mousedown', this.cardOnMouseDown);

    return cardElement;
  }

  renderCardElement (container) {
    const cardElement = this.buildCardElement();
    container.appendChild(cardElement);
  }

  onMouseDown(e) {
    e.preventDefault();
    if (e.target.classList.contains('card-widget-add')) {
      this.cardWidgetAddOnClick(e);
    }
  }

  cardWidgetAddOnClick(e) {
    e.preventDefault();
    const currentColumn = e.target.closest('.column');
    const currentWidget = currentColumn.querySelector('.card-widget').remove();
    currentColumn.querySelector('.column-add-card-btn').classList.remove('hide');
    this.renderCardElement(currentColumn.querySelector('.column-main'));
  }

  cardElementMouseEnter (e) {
    e.target.querySelector('.delete').classList.remove('hide');
  }

  cardElementMouseLeave(e) {
    e.target.querySelector('.delete').classList.add('hide');
  }

  cardOnMouseDown (e) {
    e.preventDefault();

    if (e.target.classList.contains('delete')) {
      return;
    }

    this.actualElement = e.target.closest('.card');
    this.actualElement.querySelector('.delete').classList.add('hide');
    this.draggedElement = e.target.closest('.card').cloneNode(true);
    this.actualElement.classList.add('opacity');
    this.draggedElement.classList.add('dragged');
    this.draggedElement.style.width = `${this.actualElement.offsetWidth}px`;

    document.body.appendChild(this.draggedElement);
    const coords = this.actualElement.getBoundingClientRect();

    this.draggedElement.style.left = `${coords.x}px`;
    this.draggedElement.style.top = `${coords.y - 8}px`;
    
  }

  deleteOnClick(e) {
    const currentCard = e.target.closest('.card');
    currentCard.remove();
  }
}
