const CLASSES = {
  DROP_BG: 'dropdownBackground',
  TRIGGER_ENTER: 'trigger-enter'
};

class FollowAlongDropdown {
  constructor() {
    this.triggers = document.querySelectorAll('.cool > li');
    this.background = document.querySelector(`.${CLASSES.DROP_BG}`);
    this.nav = document.querySelector('.top');
    this.navCoords = this.nav.getBoundingClientRect();
  }

  eventHandler() {
    this.triggers.forEach(trigger =>
      trigger.addEventListener('mouseenter', e => this.handleEnter(e))
    );

    this.triggers.forEach(trigger =>
      trigger.addEventListener('mouseleave', e => this.handleLeave(e))
    );
  }

  handleEnter(e) {
    this.classList.add(`.${CLASSES.TRIGGER_ENTER}`);
    setTimeout(
      () =>
        this.classList.contains(`.${CLASSES.TRIGGER_ENTER}`) &&
        this.classList.add(`${CLASSES.TRIGGER_ENTER}-active`),
      150
    );
    this.background.classList.add('open');

    const dropdown = e.target.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - this.navCoords.top,
      left: dropdownCoords.left - this.navCoords.left
    };

    this.positionBackGround(coords);
  }

  handleLeave(e) {
    e.target.classList.remove('trigger-enter', 'trigger-enter-active');
    this.background.classList.remove('open');
  }

  positionBackGround(coords) {
    this.background.style.setProperty('width', `${coords.width}px`);
    this.background.style.setProperty('height', `${coords.height}px`);
    this.background.style.setProperty(
      'transform',
      `translate(${coords.left}px, ${coords.top}px)`
    );
  }
}

(() => {
  new FollowAlongDropdown();
})();
