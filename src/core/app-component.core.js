import {DOMListener} from './dom-listener.core';

export class AppComponent extends DOMListener {
  constructor($root, config={}) {
    super($root, config.listeners);
    this.name = config.name;
    this.emitter = config.emitter;

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
