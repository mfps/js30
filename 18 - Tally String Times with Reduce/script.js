class TallyStringTimes {
  constructor(nodes) {
    this.timeNodes = [...nodes];
    this.seconds = '';
    this.render();
  }

  getTime() {
    return (this.seconds = this.timeNodes
      .map(node => node.dataset.time)
      .map(timecode => {
        const [min, sec] = timecode.split(':').map(parseFloat);
        return min * 60 + sec;
      })
      .reduce((total, seconds) => total + seconds));
  }

  formatTime() {
    let seconds = this.getTime();
    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;
    const mins = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;
    return [hours, mins, secondsLeft, seconds];
  }

  render() {
    const [hours, mins, secondsLeft, seconds] = this.formatTime();
    const time = `${hours}:${mins}:${secondsLeft}`;
    const total = document.querySelector('#total');
    total.innerHTML = time;
    total.setAttribute('data-total', seconds);
  }
}

(() => {
  const nodes = document.querySelectorAll('[data-time]');
  new TallyStringTimes(nodes);
})();
