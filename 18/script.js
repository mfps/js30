const timeNodes = [...document.querySelectorAll('[data-time]')];

const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timecode => {
    const [min, sec] = timecode.split(':').map(parseFloat);
    return min * 60 + sec;
  })
  .reduce((total, seconds) => total + seconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

const time = `${hours}:${mins}:${secondsLeft}`;
const total = document.querySelector('#total');
total.innerHTML = time;
total.setAttribute('data-total', seconds);
console.log(hours, mins, secondsLeft);
