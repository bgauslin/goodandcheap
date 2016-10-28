export default function() {
  var touch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)

  if (touch === false) {
    document.body.classList.add('no-touch')
  }
}
