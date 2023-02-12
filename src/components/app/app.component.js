import {$} from '../../core/dom.core';

export class App {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components;
  }

  getRoot() {
    const $root = $.create('div', 'app');

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.cn);

      $el.classList.add(Component.cn);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();

      $root.append($el);
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
