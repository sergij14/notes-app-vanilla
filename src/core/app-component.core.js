import {DOMListener} from './dom-listener.core';

export class AppComponent extends DOMListener {
  constructor($root, config={}) {
    super($root, config.listeners);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
