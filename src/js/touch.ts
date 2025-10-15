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
    document.addEventListener('touchstart', this.start, {passive: true});
    document.addEventListener('touchend', this.end, {passive: true});
  }

  disconnectedCallback() {
    document.removeEventListener('touchstart', this.start);
    document.removeEventListener('touchend', this.end);
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
