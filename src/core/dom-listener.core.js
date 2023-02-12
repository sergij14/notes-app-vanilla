export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented ${this.name || ''} component`);
      }
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {}
}

function getMethodName(event) {
  return 'on' + event.charAt(0).toUpperCase() + event.slice(1);
}
