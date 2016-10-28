export default function() {
  var breakpointValue = window.getComputedStyle(document.body,':after').getPropertyValue('content').replace(/\"/g, '')
  return breakpointValue
}
