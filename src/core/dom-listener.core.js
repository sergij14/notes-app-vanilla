export class DOMListener {
  constructor($root) {
    if (!$root) {
      throw new Error('no $root provided');
    }
    this.$root = $root;
  }
}
