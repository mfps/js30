class Events {
  constructor() {
    this.divs = document.querySelectorAll('div');
    this.button = document.querySelector('button');
    this.eventHandler();
  }

  logText(e) {
    console.log(e.target.classList.value);

    // e.stopPropagation(); // stop bubbling!

    // console.log(this);
  }

  eventHandler() {
    this.divs.forEach(div =>
      div.addEventListener('click', e => this.logText(e), {
        capture: false,
        once: true
      })
    );
    this.button.addEventListener(
      'click',
      () => {
        console.log('Click!!!');
      },
      {
        once: true
      }
    );
  }
}

(() => {
  new Events();
})();
