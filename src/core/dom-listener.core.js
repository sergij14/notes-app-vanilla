import {capitalize} from './utils.core';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  getMethodName(event) {
    return 'on' + capitalize(event);
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented ${this.name || ''} component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
