document.addEventListener('DOMContentLoaded', function() {

  // set initial debug state
  var debugFlag = 0

  var debugModules = [
    'nodes',
    'guides',
    //'attr'
    //'breakpoints'
  ]

  // make debugger if cssDebug is set
  var cssDebug = initCssDebug(debugFlag)

  if (cssDebug) {
    var prefs = initPrefs(debugModules)
    initCssDebugger(debugModules, prefs)
  }

}) // end DOMContentLoaded


// -----------------------------------------------------------------

function initCssDebugger(debugModules, prefs) {
  document.body.classList.add('debug-enabled')

  // inject css-debugger...
  document.body.appendChild(document.createElement('div')).classList.add('css-debugger')

  document.querySelector('.css-debugger').appendChild(document.createElement('ul'))

  var cssDebuggerList = document.querySelector('.css-debugger ul')
  cssDebuggerList.insertAdjacentHTML('afterend', '<p class="breakpoint">')

  // loop through debugModules...
  debugModules.forEach(function(item, i) {
    // create list items with module info
    var listItem = document.createElement('li')

    var listItemLink = document.createElement('a')
    listItemLink.setAttribute('href', '#')
    listItemLink.setAttribute('data-debug-module', item)
    listItemLink.classList.add(item)
    listItemLink.textContent = item

    // set link class and body class if item is in localStorage
    if (prefs.indexOf(item) > -1) {
      document.body.classList.toggle(item)
      listItemLink.classList.add('on')
    }

    listItem.appendChild(listItemLink) // append each link to its parent list item

    cssDebuggerList.appendChild(listItem) // populate css-debugger with list item
  });


  // create event listeners
  [].forEach.call(document.querySelectorAll('.css-debugger a'), function(el) {

    el.addEventListener('click', function(e) {
      this.classList.toggle('on')
      var module = this.getAttribute('data-debug-module')
      togglePref(module, prefs)
      e.preventDefault()
    })

  });


  // log breakpoints on resize
  window.onresize = function() {
    logBreakpoint(prefs);
  }

} // end initCssDebugger


function logBreakpoint(prefs) {
  //if (prefs.indexOf('breakpoints') > -1) {
    var value = window.getComputedStyle(document.body,':after').getPropertyValue('content').replace(/\"/g, '')
    //console.log('breakpoint = ' + value)
  //}
}


function togglePref(module, prefs) {
  document.body.classList.toggle(module) // toggle module class on body

  // check if module is in localStorage
  var isStored = prefs.indexOf(module)
  if (isStored > -1) {
    prefs.splice(isStored, 1) // yes: remove it
  } else {
    prefs.push(module) // no: add it
  }

  localStorage.setItem('cssDebugPrefs', JSON.stringify(prefs)) // save cssDebugPrefs to localStorage

} // end togglePref


function initCssDebug(debugFlag) {
  var cssDebug = localStorage.getItem('cssDebug') // see if cssDebug exists in localStorage

  if (cssDebug) {
    cssDebug = JSON.parse(cssDebug) // yes: set cssDebug from localStorage
  } else {
    cssDebug = debugFlag // no: create it and set it to 0
    localStorage.setItem('cssDebug', cssDebug)
  }

  return cssDebug

} // end initCssDebug


function initPrefs(debugModules) {
  var prefs = localStorage.getItem('cssDebugPrefs') // see if cssDebugPrefs exists in localStorage

  if (prefs) {
    prefs = JSON.parse(prefs) // yes: set prefs from localStorage
  } else {
    prefs = [] // no: create it
    localStorage.setItem('cssDebugPrefs', JSON.stringify(prefs))
  }

  return prefs

} // end initPrefs
