class FollowAlong {
  constructor() {
    this.triggers = document.querySelectorAll('a');
    this.highlight = document.createElement('span');

    this.init();
  }

  init() {
    this.highlight.classList.add('highlight');
    document.body.appendChild(this.highlight);

    this.eventHandler();
  }

  eventHandler() {
    this.triggers.forEach(link =>
      link.addEventListener('mouseenter', e => this.highlightLink(e))
    );
  }

  highlightLink(e) {
    const linkCoords = e.target.getBoundingClientRect();
    const coords = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    };
    this.highlight.style.width = `${coords.width}px`;
    this.highlight.style.height = `${coords.height}px`;
    this.highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
  }
}

(() => {
  new FollowAlong();
})();
