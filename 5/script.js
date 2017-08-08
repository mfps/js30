class GalleryPanel {
  constructor() {
    this.panels = document.querySelectorAll('.panel');

    this.eventHandler();
  }

  toggleOpen(e, panel) {
    panel.classList.toggle('open');
  }

  toggleActive(e, panel) {
    if (e.propertyName.includes('flex')) {
      panel.classList.toggle('open-active');
    }
  }

  eventHandler() {
    this.panels.forEach(panel => {
      panel.addEventListener('click', e => this.toggleOpen(e, panel));
    });

    this.panels.forEach(panel =>
      panel.addEventListener('transitionend', e => this.toggleActive(e, panel))
    );
  }
}

(() => {
  new GalleryPanel();
})();
