import './card.css';
import { getCardHtml } from './cardHtml';

export default class Card {
  constructor() {
    this.actualElement;
    this.draggedElement;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.cardOnMouseDown = this.cardOnMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    document.body.addEventListener('mousedown', this.onMouseDown);
  }

  buildCardElement(title = 'Default title', description = 'Default description') {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = getCardHtml(title, description);

    cardElement.querySelector('.delete').addEventListener('click', this.deleteOnClick);
    cardElement.addEventListener('mouseenter', this.cardElementMouseEnter);
    cardElement.addEventListener('mouseleave', this.cardElementMouseLeave);
    cardElement.addEventListener('mousedown', this.cardOnMouseDown);

    return cardElement;
  }

  renderCardElement(container) {
    const cardElement = this.buildCardElement();
    container.appendChild(cardElement);
  }

  cardWidgetAddOnClick(e) {
    e.preventDefault();
    const currentColumn = e.target.closest('.column');
    const currentWidget = currentColumn.querySelector('.card-widget').remove();
    currentColumn.querySelector('.column-add-card-btn').classList.remove('hide');
    this.renderCardElement(currentColumn.querySelector('.column-main'));
  }

  cardElementMouseEnter(e) {
    e.target.querySelector('.delete').classList.remove('hide')
  }

  cardElementMouseLeave(e) {
    e.target.querySelector('.delete').classList.add('hide');
  }

  cardOnMouseDown(e) {
    e.preventDefault();

    if (e.target.classList.contains('delete')) {
      return;
    }

    this.actualElement = e.target.closest('.card');
    this.actualElement.querySelector('.delete').classList.add('hide');

    this.draggedElement = e.target.closest('.card').cloneNode(true);
    this.draggedElement.classList.add('dragged-element');

    this.draggedElement.style.width = `${this.actualElement.offsetWidth}px`;
    this.actualElement.classList.add('actual-element');

    this.actualElementCoords = this.actualElement.getBoundingClientRect();
    document.body.appendChild(this.draggedElement);

    this.x = e.clientX - this.actualElementCoords.x;
    this.y = e.clientY - this.actualElementCoords.y;

    this.draggedElement.style.left = `${this.actualElementCoords.x}px`;
    this.draggedElement.style.top = `${this.actualElementCoords.y - 8}px`;

    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(e) {
    e.preventDefault();

    if (e.target.classList.contains('card-widget-add')) {
      this.cardWidgetAddOnClick(e);
    }
  }

  onMouseUp(e) {
    e.preventDefault();

    if (this.draggedElement) {
      this.actualElement.classList.remove('actual-element');
      this.draggedElement.remove();

      document.body.removeEventListener('mousemove', this.onMouseMove);
    }

  }

  onMouseMove(e) {
    e.preventDefault();

    let select;

    this.draggedElement.style.left = `${e.clientX - this.x}px`;
    this.draggedElement.style.top = `${e.clientY - this.y - 10}px`;

    select = e.target.closest('.card');

    if (select && select !== this.actualElement) {
      const { y } = select.getBoundingClientRect();

      if (e.clientY > (y + select.offsetHeight / 2) && select.nextElementSibling !== this.actualElement) {
        select.after(this.actualElement);
      }

      if (e.clientY < (y + select.offsetHeight / 2) && select.previousElementSibling !== this.actualElement) {
        select.parentElement.insertBefore(this.actualElement, select);
      }
    }


    if (e.target.classList.contains('column-add-card-btn') || e.target.classList.contains('column-footer')) {
      const column = e.target.closest('.column');
      column.querySelector('.column-main').appendChild(this.actualElement);
    }

  }

  deleteOnClick(e) {
    const currentCard = e.target.closest('.card');
    currentCard.remove();
  }
}
