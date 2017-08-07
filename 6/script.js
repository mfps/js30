const ENTPOINTS = {
  CITYS: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
};

class TypeAhead {
  constructor() {
    this.searchInput = document.querySelector('.search');
    this.suggestions = document.querySelector('.suggestions');
    this.cities = [];

    this.init();
  }

  init() {
    this.getData();
    this.eventHandler();
  }

  getData() {
    return fetch(ENTPOINTS.CITYS)
      .then(blob => blob.json())
      .then(data => this.cities.push(...data));
  }

  findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  displayMatches(e) {
    const matchArray = this.findMatches(e.target.value, this.cities);
    const html = matchArray
      .map(place => {
        const cityName = this.markTarget(e.target.value, place, 'city');
        const stateName = this.markTarget(e.target.value, place, 'state');
        return this.resultTemplate(cityName, stateName, place);
      })
      .join('');
    this.suggestions.innerHTML = html;
  }

  resultTemplate(cityName, stateName, place) {
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${this.numberWithCommas(place.population)}</span>
      </li>
    `;
  }

  markTarget(value, place, position) {
    const regex = new RegExp(value, 'gi');
    return place[position].replace(regex, `<span class="hl">${value}</span>`);
  }

  eventHandler() {
    this.searchInput.addEventListener('change', e => this.displayMatches(e));
    this.searchInput.addEventListener('keyup', e => this.displayMatches(e));
  }
}

(() => {
  new TypeAhead();
})();