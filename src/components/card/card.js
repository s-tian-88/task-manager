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
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.renderAlreadyCards = this.renderAlreadyCards.bind(this);

    document.body.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('DOMContentLoaded', this.renderAlreadyCards)
  }

  buildCardElement(id, title, description) {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('id', id);
    cardElement.classList.add('card');
    cardElement.innerHTML = getCardHtml(title, description);

    cardElement.querySelector('.delete').addEventListener('click', this.deleteOnClick);
    cardElement.addEventListener('mouseenter', this.cardElementMouseEnter);
    cardElement.addEventListener('mouseleave', this.cardElementMouseLeave);
    cardElement.addEventListener('mousedown', this.cardOnMouseDown);

    return cardElement;
  }

  renderAlreadyCards () {
    if (localStorage.length === 0) {
      return;
    }

    console.log(localStorage);
    for (let key in localStorage) {
      let obj = JSON.parse(localStorage.getItem(key))
      if (obj && obj.hasOwnProperty('id')) {
        this.renderCardElement(obj);
      }
    }

  }

  renderCardElement(cardObject) {
    const cardElement = this.buildCardElement(cardObject.id, cardObject.title, cardObject.description);
    document.querySelector(`.${cardObject.column}`).querySelector('.column-main').appendChild(cardElement);
  }

  cardWidgetAddOnClick(e) {
    e.preventDefault();

    const widget = e.target.closest('.card-widget');

    const cardObject = {
      id: Date.now(),
      column: widget.closest('.column').getAttribute('name'),
      title: widget.querySelector('.card-widget-title').value,
      description: widget.querySelector('.card-widget-description').value,
    };

    const currentColumn = e.target.closest('.column');
    const currentWidget = currentColumn.querySelector('.card-widget').remove();

    currentColumn.querySelector('.column-add-card-btn').classList.remove('hide');

    localStorage.setItem(cardObject.id, JSON.stringify(cardObject))
    this.renderCardElement(cardObject);
  }

  cardElementMouseEnter(e) {
    e.target.querySelector('.delete').classList.remove('hide');
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
    if (e.target.classList.contains('card-widget-add')) {
      e.preventDefault();
      this.cardWidgetAddOnClick(e);
    }
  }

  onMouseUp(e) {
    e.preventDefault();

    if (this.draggedElement) {
      this.actualElement.classList.remove('actual-element');
      this.draggedElement.remove();

      const storageItem = JSON.parse(localStorage.getItem(this.actualElement.getAttribute('id')));
      storageItem.column = this.actualElement.closest('.column').getAttribute('name');
      localStorage.setItem(storageItem.id, JSON.stringify(storageItem))

      document.body.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseMove(e) {
    e.preventDefault();

    this.draggedElement.style.left = `${e.clientX - this.x}px`;
    this.draggedElement.style.top = `${e.clientY - this.y - 10}px`;

    const select = e.target.closest('.card');

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
    const cardId = currentCard.getAttribute('id');

    localStorage.removeItem(currentCard.getAttribute('id'));

    currentCard.remove();
  }

}
