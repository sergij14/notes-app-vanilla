import {AppComponent} from '../../core/app-component.core';

export class Header extends AppComponent {
    static cn = 'app-header'

    constructor($root) {
      super($root, {
        name: 'Header',
        listeners: [
          'input',
        ],
      });
    }

    toHTML() {
      return `
        <h1>header</h1>
        <input type="text" />
      `;
    }

    onInput(evt) {
      console.log('formula:event', evt.target.value);
    }
}
