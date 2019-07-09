import fastclick from 'fastclick';

/** @class */
export default class {
  /** Intializes site-wide widgets, utilities, etc. */
  static init() {
    fastclick.attach(document.body);
    this.noTouch_();
    if (process.env.NODE_ENV === 'production') {
      this.googleAnalytics_();
    }
  }

  /**
   * Adds 'no-touch' attribute if not a touch-enabled device.
   * @private
   */
  static noTouch_() {
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return;
    } else {
      document.body.setAttribute('no-touch', '');
    }
  }

  /**
   * Initializes Google Analytics.
   * @private
   */
  static googleAnalytics_() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', process.env.GA_ID, 'auto');
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
