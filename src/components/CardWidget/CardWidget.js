import Card from '../Card/Card';

export default class CardWidget {
  constructor() {
    this.breakBtnOnClick = this.breakBtnOnClick.bind(this);
    this.moreBtnOnClick - this.moreBtnOnClick.bind(this);
    this.submit = this.submit.bind(this);

    let currentWidget;
  }

  addWidget(container) {
    const widget = this.createWidgetElement();
    container.appendChild(widget);

    container.querySelector('.add-another-card-btn').classList.add('inactive');
  }

  createWidgetElement() {
    const widgetElement = document.createElement('form');
    widgetElement.classList.add('widget');

    const titleEl = this.createTitleElement();
    const contentEl = this.createContentElement();
    const buttonsEl = this.createButtonsElement();

    widgetElement.appendChild(titleEl);
    widgetElement.appendChild(contentEl);
    widgetElement.appendChild(buttonsEl);

    widgetElement.addEventListener('submit', this.submit);

    return widgetElement;
  }

  createTitleElement() {
    const titleElement = document.createElement('input');
    titleElement.classList.add('title-input');
    titleElement.setAttribute('type', 'text');
    titleElement.setAttribute('placeholder', 'Title...');
    titleElement.setAttribute('required', '');

    return titleElement;
  }

  createContentElement() {
    const contentElement = document.createElement('textarea');
    contentElement.classList.add('content-input');
    contentElement.setAttribute('placeholder', 'Description...');
    contentElement.setAttribute('required', '');

    return contentElement;
  }

  createButtonsElement() {
    const addBtn = document.createElement('button');
    addBtn.classList.add('widget-add-btn');
    addBtn.textContent = 'Add card';
    // addBtn.addEventListener('submit', this.addBtnOnClick);

    const breakBtn = document.createElement('button');
    breakBtn.classList.add('widget-break-btn');
    breakBtn.textContent = 'Break';
    breakBtn.addEventListener('click', this.breakBtnOnClick);

    const moreBtn = document.createElement('button');
    moreBtn.classList.add('widget-more-button');
    moreBtn.textContent = '...';
    moreBtn.addEventListener('click', this.moreBtnOnClick);

    const buttonsElement = document.createElement('div');
    buttonsElement.classList.add('widget-buttons');

    buttonsElement.appendChild(addBtn);
    buttonsElement.appendChild(breakBtn);
    buttonsElement.appendChild(moreBtn);

    return buttonsElement;
  }

  breakBtnOnClick(e) {
    e.preventDefault();
    e.target.closest('.column').querySelector('.add-another-card-btn').classList.remove('inactive');
    const widget = e.target.closest('.widget');
    widget.remove();
  }

  moreBtnOnClick(e) {
    e.preventDefault();
    console.log(e);
  }

  submit(e) {
    e.preventDefault();
    e.target.closest('.column').querySelector('.add-another-card-btn').classList.remove('inactive');
    const widget = e.target.closest('.widget');

    const title = widget.querySelector('.title-input').value;
    const description = widget.querySelector('.content-input').value;

    const card = new Card(widget.closest('.column').querySelector('.col-main'));
    card.addCard(title, description);

    widget.remove();
  }
}
