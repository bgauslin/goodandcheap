import fastclick from 'fastclick';

/** @class */
export default class {
  /**
   * Intializes site-wide utilities.
   * @public
   */
  static init() {
    this.touchEnabled();
    this.googleAnalytics();

    this.viewportHeight();
    window.addEventListener('resize', this.viewportHeight);
  }

  /**
   * Initializes Google Analytics.
   * @private
   */
  static googleAnalytics() {
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
  static touchEnabled() {
    if ('ontouchstart' in window || window.DocumentTouch) {
      document.body.removeAttribute('no-touch');
      fastclick.attach(document.body);
    }
  }

  /**
   * Sets custom property for viewport height that updates 'vh' calculation due
   * to iOS Safari behavior where chrome appears and disappears when scrolling.
   */
   static viewportHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }
}
