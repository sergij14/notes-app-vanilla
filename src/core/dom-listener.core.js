export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('no $root provided');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log('init');
  }

  removeDOMListeners() {
  }
}
