import fastclick from 'fastclick';

/** @class */
export default class {
  /**
   * Intializes site-wide widgets, utilities, etc.
   * @public
   */
  static init() {
    this.touchEnabled_();
    this.googleAnalytics_();
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

  /**
   * Initializes Google Analytics.
   * @private
   */
  static googleAnalytics_() {
    if (process.env.NODE_ENV === 'production') {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', process.env.GA_ID, 'auto');
    }
  }

  /**
   * Removes 'no-touch' attribute and adds fastclick if device is touch-enabled.
   * @private
   */
  static touchEnabled_() {
    if ('ontouchstart' in window || window.DocumentTouch) {
      document.body.removeAttribute('no-touch');
      fastclick.attach(document.body);
    }
  }
}
