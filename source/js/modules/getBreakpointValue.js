export default () => {
  return window.getComputedStyle(document.body,':after').getPropertyValue('content').replace(/\"/g, '');
}
