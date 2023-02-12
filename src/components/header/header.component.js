import {AppComponent} from '../../core/app-component.core';

export class Header extends AppComponent {
    static cn = 'app-header'

    toHTML() {
      return '<h1>header</h1>';
    }
}
