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

export function getNodeByDataType(node, type) {
  if (node?.dataset.type === type) {
    return node;
  }
  if (node === document.body) {
    return;
  }
  return getNodeByDataType(node.parentElement, type);
}
