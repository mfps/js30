const CLASSES = {
  MAIN: 'main',
  NAV: 'fixed-nav'
};

class StickyNav {
  constructor() {
    this.nav = document.querySelector(`#${CLASSES.MAIN}`);
    this.topOfNav = this.nav.offsetTop;
    this.init();
  }

  init() {
    this.eventHandler();
  }

  eventHandler() {
    window.addEventListener('scroll', e => this.fixNav(e));
  }

  fixNav(e) {
    if (window.scrollY >= this.topOfNav) {
      document.body.style.paddingTop = this.nav.offsetHeight + 'px';
      document.body.classList.add(CLASSES.NAV);
    } else {
      document.body.classList.remove(CLASSES.NAV);
      document.body.style.paddingTop = 0;
    }
  }
}

(() => {
  new StickyNav();
})();
