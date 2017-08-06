class SpeechRecognition {
  constructor() {
    this.words = document.querySelector('.words');
    this.init();
  }

  init() {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognition.lang = 'de-DE';
    recognition.interimResults = true;

    this.render();
    this.eventHandler(recognition);
    recognition.start();
  }

  eventHandler(recognition) {
    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      this.addText(transcript, e.results[0].isFinal);
    });

    recognition.addEventListener('end', recognition.start);

    recognition.addEventListener('error', e => {
      console.log(e);
    });
  }

  addText(text, isFinal) {
    const p = this.words.lastElementChild;
    const poopScript = text.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (isFinal) {
      this.render();
    }
  }

  render() {
    const p = document.createElement('p');
    this.words.appendChild(p);
  }
}

(() => {
  new SpeechRecognition();
})();

/*

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition)();
recognition.interimResults = true;
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
recognition.addEventListener('result', e => {
  console.log(e);
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
  const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
  p.textContent = poopScript;
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
});
recognition.addEventListener('end', recognition.start);
recognition.start();
*/
