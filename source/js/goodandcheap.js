import attachFastClick from 'fastclick';
import googleAnalytics from './modules/googleAnalytics';
import noTouch from './modules/noTouch';
import './vue/app';

const gaData = {
  domain: 'goodandcheap.website',
  id: 'UA-626192-14'
}

attachFastClick(document.body);
googleAnalytics(gaData);
noTouch();
