import attachFastClick from 'fastclick'
attachFastClick(document.body)

import noTouch from './modules/noTouch'
noTouch()

import './vue/app'
import './modules/googleAnalytics'
