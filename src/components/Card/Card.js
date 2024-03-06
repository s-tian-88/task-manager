import './Card.css';

export default class Card {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Container is not HTMLElement');
    }

    this.detailsBtnOnClick = this.detailsBtnOnClick.bind(this);
    this.likeBtnOnClick = this.likeBtnOnClick.bind(this);
    this.commentBtnOnClick = this.commentBtnOnClick.bind(this);
    this.cardElementIsMouseEnter = this.cardElementMouseEnter.bind(this);
    this.cardElementMouseLeave = this.cardElementMouseLeave.bind(this);
    this.deleteBtnMouseEnter - this.deleteBtnMouseEnter.bind(this);
    this.deleteBtnOnClick = this.deleteBtnOnClick.bind(this);

    this.container = container;
  }

  addCard(title = 'Title', description = 'Description...') {
    this.container.appendChild(this.createCardElement(title, description));
  }

  createCardElement(title, description) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    cardElement.appendChild(this.createCardHeaderElement(title));
    cardElement.appendChild(this.createCardContentElement(description));
    cardElement.appendChild(this.createCardFooterElement());

    cardElement.addEventListener('mouseenter', this.cardElementMouseEnter);
    cardElement.addEventListener('mouseleave', this.cardElementMouseLeave);

    return cardElement;
  }

  createCardHeaderElement(title) {
    const cardHeaderElement = document.createElement('div');

    cardHeaderElement.classList.add('card-header');
    cardHeaderElement.textContent = title;

    cardHeaderElement.appendChild(this.createDeleteCardBtnElement());

    return cardHeaderElement;
  }

  createCardContentElement(content) {
    const cardContentElement = document.createElement('div');

    cardContentElement.classList.add('card-content');
    cardContentElement.textContent = content;

    return cardContentElement;
  }

  createCardFooterElement() {
    const cardFooterElement = document.createElement('div');
    cardFooterElement.classList.add('card-footer');

    cardFooterElement.appendChild(this.createDetailsBtnElement());
    cardFooterElement.appendChild(this.createLikeBtnElement());
    cardFooterElement.appendChild(this.createCommentBtnElement());

    return cardFooterElement;
  }

  createLikeBtnElement() {
    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-btn');
    likeBtn.textContent = 'Like';
    likeBtn.addEventListener('click', this.likeBtnOnClick);

    return likeBtn;
  }

  createDetailsBtnElement() {
    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details-btn');
    detailsBtn.textContent = 'Details';
    detailsBtn.addEventListener('click', this.detailsBtnOnClick);

    return detailsBtn;
  }

  createCommentBtnElement() {
    const commentBtn = document.createElement('button');
    commentBtn.classList.add('comment-btn');
    commentBtn.textContent = 'Comment';
    commentBtn.addEventListener('click', this.commentBtnOnClick);

    return commentBtn;
  }

  createDeleteCardBtnElement() {
    const deleteCardBtnElement = document.createElement('button');
    deleteCardBtnElement.classList.add('delete-btn', 'inactive');
    deleteCardBtnElement.textContent = 'Delete';

    deleteCardBtnElement.addEventListener('click', this.deleteBtnOnClick);
    deleteCardBtnElement.addEventListener('mouseenter', this.deleteBtnMouseEnter);

    return deleteCardBtnElement;
  }

  detailsBtnOnClick(e) {
    e.preventDefault();
    console.log(`"Add detail btn" on click (${e.target} column)`);
  }

  likeBtnOnClick(e) {
    e.preventDefault();
    console.log(`"Add like btn" on click (${e.target} column)`);
  }

  commentBtnOnClick(e) {
    e.preventDefault();
    console.log(`"Add comment btn" on click (${e.target} column)`);
  }

  cardElementMouseEnter(e) {
    e.preventDefault();
    e.target.querySelector('.delete-btn').classList.remove('inactive');
  }

  cardElementMouseLeave(e) {
    e.preventDefault();
    e.target.querySelector('.delete-btn').classList.add('inactive');
  }

  deleteBtnOnClick(e) {
    e.preventDefault();
    const el = e.target.closest('.card');

    el.removeEventListener('mouseenter', this.cardElementMouseEnter);
    el.removeEventListener('mouseleave', this.cardElementMouseLeave);
    // console.log(e.currentTarget)
    el.remove();
  }

  deleteBtnMouseEnter(e) {
    e.preventDefault();
    console.log('delete button mouse enter');
  }
}
