import {Events} from './shared';


/**
 * Custom element that adds/removes a class on touched elements for CSS styling.
 */
customElements.define('gc-touch', class GoodAndCheapTouch extends HTMLElement {
  private end: EventListenerObject;
  private start: EventListenerObject;
  private target: HTMLElement;

  constructor() {
    super();
    this.start = this.touchstart.bind(this);
    this.end = this.touchend.bind(this);
  }

  connectedCallback() {
    document.addEventListener(Events.Touchstart, this.start, {passive: true});
    document.addEventListener(Events.Touchend, this.end, {passive: true});
  }

  disconnectedCallback() {
    document.removeEventListener(Events.Touchstart, this.start);
    document.removeEventListener(Events.Touchend, this.end);
  }

  touchstart(event: Event) {
    this.target = <HTMLElement>event.composedPath()[0];

    if (['a', 'button'].includes(this.target.tagName.toLowerCase())) {
      this.target.classList.add('touch');
    }
  }

  touchend() {
    this.target.classList.remove('touch');

    // In case of touchmove.
    [...document.querySelectorAll('.touch')].forEach(element => {
      element.classList.remove('touch');
    });
  }
});
