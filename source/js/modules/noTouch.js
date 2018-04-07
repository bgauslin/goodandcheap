export default () => {
  const touch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

  if (!touch) {
    document.body.classList.add('no-touch');
  }
}
