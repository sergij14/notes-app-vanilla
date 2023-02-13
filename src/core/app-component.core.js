import {DOMListener} from './dom-listener.core';

export class AppComponent extends DOMListener {
  constructor($root, config={}) {
    super($root, config.listeners);
    this.name = config.name;
    this.emitter = config.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $subscribe(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
