class WackAMole {
  constructor() {
    this.holes = document.querySelectorAll('.hole');
    this.scoreBoard = document.querySelector('.score');
    this.moles = document.querySelectorAll('.mole');
    this.start = document.getElementById('start-game');

    this.lastHole = 0;
    this.timeUp = false;
    this.score = 0;

    this.eventHandler();
  }

  startGame() {
    this.scoreBoard.textContent = 0;
    this.timeUp = false;
    this.score = 0;
    this.peep();
    setTimeout(() => this.timeUp = true, 10000);
  }

  peep() {
    const time = this.randomTime(200, 1000);
    const hole = this.randomHole(this.holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!this.timeUp) this.peep();
    }, time);
  }

  bonk(e) {
    if (!e.isTrusted) return;
    this.score++;
    e.target.parentNode.classList.remove('up');
    this.scoreBoard.textContent = this.score;
  }

  randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === this.lastHole) {
      return this.randomHole(this.holes);
    }
    this.lastHole = hole;
    return hole;
  }
  randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  eventHandler() {
    this.moles.forEach(mole =>
      mole.addEventListener('click', e => this.bonk(e))
    );

    this.start.addEventListener('click', e => this.startGame());
  }
}

(() => {
  new WackAMole();
})();
