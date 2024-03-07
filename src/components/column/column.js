import { html } from './columnHTML';
import './column.css';
import { validateColumnTitle, convertTitleToSelector } from '../../js/utils';

export default class Column {
  constructor(container, title) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Container is not HTMLElement');
    }
    this.container = container;
  }

  addColumn(title) {
    if (!(validateColumnTitle(title))) {
      throw new Error('Input title is incorrect');
    }
    this.title = title;

    this.columnSelector = convertTitleToSelector(title);

    const columnElement = document.createElement('div');
    columnElement.classList.add('column', this.columnSelector);

    columnElement.innerHTML = html(this.title);
    this.container.appendChild(columnElement);
  }
}
