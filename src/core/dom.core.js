class DOM {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ?
        document.querySelector(selector) :
        selector;
  }

  html(template) {
    if (typeof template === 'string') {
      this.$el.innerHTML = template;
    }

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  removeAttr(attr) {
    this.$el.removeAttribute(attr);
    return this;
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el;
    }

    this.$el.append(node);
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
