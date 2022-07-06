function swap(arr, x, y) {
  var b = arr[x].html;
  arr[x].html = arr[y].html;
  arr[y] = b;
  return arr;
}
function qsa(selector) {
  return document.querySelectorAll(selector);
}
function qs(selector) {
  return document.querySelector(selector);
}
const { el, mount } = redom;
