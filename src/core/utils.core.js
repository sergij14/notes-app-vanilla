export function generateID() {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function hasValues(obj) {
  return Object.values(obj).every((val) => val.length);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFieldTemplate(config) {
  const {
    value = '',
    placeholder = '',
    classes = '',
    name = '',
    type = 'text',
  } = config;
  switch (type) {
    case 'number':
      return `<input value="${value}" name="${name}" class="${classes}" type="${type}" min="1" max="10" placeholder="${placeholder}" />`;
    case 'text-area':
      return `<textarea name="${name}" class="${classes}" placeholder="${placeholder}">${value}</textarea>`;
    default:
      return `<input value="${value}" name="${name}" class="${classes}" type="text" placeholder="${placeholder}" />`;
  }
}

export function getNodeByDataType(node, type) {
  if (node.dataset.type === type) {
    return node;
  }
  if (node.id === 'root') {
    return;
  }
  return getNodeByDataType(node.parentElement, type);
}
