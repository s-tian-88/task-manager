

export default class Column {
  constructor (container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Container is not HTMLElement');
    }
    this.container = container;
  }

}
