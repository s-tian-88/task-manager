import { getCardWidgetHTML } from './cardWidgetHTML';
import './cardWidget.css';

export default class CardWidget {
  constructor() {
    this.currentCardWidget = undefined;
    this.currentColumn = undefined;

    this.widgetBreakOnClick = this.widgetBreakOnClick.bind(this);
    this.columnAddCardBtnOnClick = this.columnAddCardBtnOnClick.bind(this);

    this.buttons = document.body.querySelectorAll('.column-add-card-btn');
    this.buttons.forEach((btn) => btn.addEventListener('click', this.columnAddCardBtnOnClick));
  }

  renderCardWidgetElement(column) {
    const widget = this.buildCardWidgetElement();
    column.appendChild(widget);

    return widget;
  }

  buildCardWidgetElement() {
    const cardWidgetElement = document.createElement('form');
    cardWidgetElement.classList.add('card-widget');
    cardWidgetElement.innerHTML = getCardWidgetHTML();

    cardWidgetElement.addEventListener('submit', this.submit);
    cardWidgetElement.querySelector('.card-widget-break').addEventListener('click', this.widgetBreakOnClick);
    cardWidgetElement.querySelector('.card-widget-clean').addEventListener('click', this.widgetCleanOnClick);

    return cardWidgetElement;
  }

  columnAddCardBtnOnClick(e) {
    e.preventDefault();

    if (this.currentWidget) {
      this.currentWidget.remove();
      this.currentColumn.querySelector('.column-add-card-btn').classList.remove('hide');
    }

    e.target.classList.add('hide');
    this.currentColumn = e.target.closest('.column');
    this.currentWidget = this.renderCardWidgetElement(this.currentColumn);
  }

  submit(e) {
    e.preventDefault();
  }

  widgetBreakOnClick(e) {
    e.preventDefault();
    this.currentWidget.remove();
    this.currentColumn.querySelector('.column-add-card-btn').classList.remove('hide');
  }

  widgetCleanOnClick = (e) => {
    this.currentWidget.reset();
  };
}
