import attachFastClick from 'fastclick';

/** @enum {string} */
const Config = {
  API_DEV: 'http://api.goodandcheap.test',
  API_PROD: 'https://api.goodandcheap.website',
  API_VERSION: 'v2',
  DOMAIN: 'goodandcheap.website',
  GA_ID: 'UA-626192-14',
}

/** @class */
export default class {
  /** Intializes site-wide widgets, utilities, etc. */
  static init() {
    attachFastClick(document.body);
    this.noTouch_();
    this.googleAnalytics_();
  }

  /**
   * Removes 'no-touch' attribute if device isn't touch-enabled.
   * @private
   */
  static noTouch_() {
    if ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) {
      document.body.removeAttribute('no-touch');
    }
  }

  /**
   * Gets JSON API's base URL based on server environment.
   * @return {string}
   * @public
   */
  static apiBaseURL() {
    const baseURL = (window.location.hostname !== Config.DOMAIN) ? Config.API_DEV : Config.API_PROD;
    return `${baseURL}/${Config.API_VERSION}/`;
  }

  /**
   * Initializes Google Analytics.
   * @private
   */
  static googleAnalytics_() {
    if (window.location.hostname === Config.DOMAIN) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', Config.GA_ID, 'auto');
    }
  }

  /**
   * Gets breakpoint name as set by CSS as a hook for JS methods that occur at
   * media query breakpoints.
   * @return {string}
   * @public
   */
  static getBreakpointValue() {
    return window.getComputedStyle(document.body,'::after').getPropertyValue('content').replace(/\"/g, '');
  }
}
