import {$} from '../../core/dom.core';
import {Emitter} from '../../core/emitter.core';

export class App {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components;
    this.emitter = new Emitter();
    this.store = options.store;
  }

  getRoot() {
    const $root = $.create('div', 'app');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.cn);

      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
