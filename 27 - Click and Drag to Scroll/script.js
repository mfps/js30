class ScrollDragMenu {
  constructor() {
    this.slider = document.querySelector('.items');
    this.isDown = false;
    this.startX;
    this.scrollLeft;

    this.eventHandler();
  }

  toggleActive(isDown = false) {
    if (isDown) {
      this.isDown = isDown;
      this.slider.classList.add('active');
      return;
    }
    this.isDown = false;
    this.slider.classList.remove('active');
  }

  eventHandler() {
    this.slider.addEventListener('mousedown', e => {
      this.toggleActive(true);
      this.startX = e.pageX - this.slider.offsetLeft;
      this.scrollLeft = this.slider.scrollLeft;
    });

    this.slider.addEventListener('mouseleave', () => {
      this.toggleActive();
    });

    this.slider.addEventListener('mouseup', () => {
      this.toggleActive();
    });

    this.slider.addEventListener('mousemove', e => {
      if (!this.isDown) return; // stop the fn from running
      e.preventDefault();
      const x = e.pageX - this.slider.offsetLeft;
      const walk = (x - this.startX) * 3;
      this.slider.scrollLeft = this.scrollLeft - walk;
    });
  }
}

(() => {
  new ScrollDragMenu();
})();
