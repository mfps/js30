import { getData } from './service';

class SortingBandNames {
  constructor(container) {
    this.container = container;
    this.render();
  }

  getList() {
    const url = './list.json';
    return getData(url).then(bands => bands);
  }

  strip(bandName) {
    return bandName.replace(/^\s(a|the|an)/i, '').trim();
  }

  async sortList() {
    const bands = await this.getList();

    return bands.sort((a, b) => (this.strip(a) > this.strip(b) ? 1 : -1));
  }

  async render() {
    const sortedBand = await this.sortList();

    this.container.innerHTML = sortedBand
      .map(band => `<li>${band}</li>`)
      .join('');
  }
}

(() => {
  const container = document.querySelector('#bands');

  new SortingBandNames(container);
})();
