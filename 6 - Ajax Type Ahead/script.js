import { Distance } from './distance';

const ENTPOINTS = {
  CITYS: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
};

class TypeAhead {
  constructor() {
    this.searchInput = document.querySelector('.search');
    this.suggestions = document.querySelector('.suggestions');
    this.cities = [];

    this.myDistance = new Distance();

    this.init();
  }

  async init() {
    await this.getData();
    this.eventHandler();
    this.getDistance();
  }

  getData() {
    return fetch(ENTPOINTS.CITYS)
      .then(response => response.json())
      .then(data => this.cities.push(...data));
  }

  getDistance() {
    this.cities.map(city => {
      return (city.distance = this.myDistance.distance(
        city.longitude,
        city.latitude
      ));
    });
  }

  findMatches(wordToMatch, cities) {
    return cities
      .filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
      })
      .sort(
        (a, b) =>
          (a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0)
      );
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  displayMatches(e) {
    const value = e.target.value;
    const matchArray = this.findMatches(value, this.cities);
    const html = matchArray
      .map(place => {
        const cityName = this.highlightSearchValue(value, place, 'city');
        const stateName = this.highlightSearchValue(value, place, 'state');
        return this.resultTemplate(cityName, stateName, place);
      })
      .join('');
    this.suggestions.innerHTML = html;
  }

  resultTemplate(cityName, stateName, place) {
    return `
      <li>
        <div class="wrapper">
          <span class="name">${cityName}, ${stateName}</span>
          <span class="distance">distance to my position: ${place.distance}km</span>
        </div>
        <span class="population">${this.numberWithCommas(place.population)}</span>
      </li>
    `;
  }

  highlightSearchValue(value, place, position) {
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
