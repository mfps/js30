class CountdownClock {
  constructor() {
    this.countdown = 0;
    this.timerDisplay = document.querySelector('.display__time-left');
    this.endTime = document.querySelector('.display__end-time');
    this.buttons = document.querySelectorAll('[data-time]');

    this.init();
  }

  init() {
    this.eventHandler();
  }

  timer(seconds) {
    clearInterval(this.countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    this.displayTimeLeft(seconds);
    this.displayEndTime(then);

    this.countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(this.countdown);
        return;
      }

      this.displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    this.timerDisplay.textContent = display;
  }

  displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = this.timeFormating(hour);
    const minutes = end.getMinutes();
    this.endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  startTimer(e) {
    const seconds = parseInt(e.target.dataset.time);
    this.timer(seconds);
  }

  timeFormating(hour) {
    let languages = navigator.languages;
    let timer;
    let i = 0;
    languages = languages.filter(lang => lang.includes('-'));
    for (i; i < languages.length; i++) {
      if (languages[i].includes('en')) {
        return hour > 12 ? hour - 12 : hour;
      }
      return hour;
    }
  }

  eventHandler() {
    this.buttons.forEach(button =>
      button.addEventListener('click', e => this.startTimer(e))
    );

    document.customForm.addEventListener('submit', e => {
      e.preventDefault();
      const mins = e.target.minutes.value;
      console.log(mins);
      this.timer(mins * 60);
      e.target.reset();
    });
  }
}

(() => {
  new CountdownClock();
})();
