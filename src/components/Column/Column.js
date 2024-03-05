import { validateColumnTitle } from '../../js/utils';
import './Column.css';

export default class Column {
  constructor(title, container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLelement');
    }

    if (!validateColumnTitle(title)) {
      throw new Error('Column name is invalid!');
    }

    this.addAnotherCardBtnElOnClick = this.addAnotherCardBtnElOnClick.bind(this);

    this.title = title.toUpperCase();
    this.container = container;
    this.selector = this.title.toLowerCase().replaceAll(' ', '-');

    this.createColumnElement();
  }

  createColumnElement() {
    const colEl = document.createElement('div');
    colEl.classList.add(this.selector, 'column');

    const colHeaderEl = document.createElement('div');
    colHeaderEl.classList.add('col-header');
    colHeaderEl.textContent = this.title;

    const colMainEl = document.createElement('div');
    colMainEl.classList.add('col-main');

    const colFooterEl = document.createElement('div');
    colFooterEl.classList.add('col-footer');

    const addAnotherCardBtnEl = document.createElement('button');
    addAnotherCardBtnEl.classList.add('add-another-card-btn');
    addAnotherCardBtnEl.textContent = '+ Add another card';
    addAnotherCardBtnEl.addEventListener('click', this.addAnotherCardBtnElOnClick);

    colFooterEl.appendChild(addAnotherCardBtnEl);

    colEl.appendChild(colHeaderEl);
    colEl.appendChild(colMainEl);
    colEl.appendChild(colFooterEl);

    this.container.appendChild(colEl);
  }

  addAnotherCardBtnElOnClick(e) {
    e.preventDefault();
    console.log(`"Add another card button" on click (${this.title} column)`);
  }
}
