class Geolocation {
  constructor() {
    this.arrow = document.querySelector('.arrow');
    this.speed = document.querySelector('.speed-value');

    this.init();
  }

  init() {
    this.getLocation();
  }

  getLocation() {
    console.log(navigator.geolocation);
    navigator.geolocation.watchPosition(
      data => {
        console.log(data);
        this.speed.textContent = data.coords.speed;
        this.arrow.transform = `rotate(${data.coords.heading}deg)`;
      },
      error => {
        console.log(error);
      }
    );
  }
}

(() => {
  new Geolocation();
})();
