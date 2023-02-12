export class App {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components;
  }

  getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('app');

    this.components.forEach((Component) => {
      const component = new Component();

      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
