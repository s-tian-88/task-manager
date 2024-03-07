import './container.css';
import { html } from './containerHTML';

export default class Container {
  constructor(body) {
    if (!(body instanceof HTMLElement)) {
      throw new Error('Body is not HTMLElement');
    }

    this.body = body;

    this.innerHTML();
  }

  innerHTML() {
    this.body.innerHTML = html;
  }
}
