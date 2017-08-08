export class Distance {
  constructor() {
    this.defineRad();
    this.latitude = 0;
    this.longitude = 0;
    this.myPosition();
  }

  defineRad() {
    /** Converts numeric degrees to radians */
    if (typeof Number.prototype.toRad === 'undefined') {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      };
    }
  }

  myPosition() {
    navigator.geolocation.getCurrentPosition(
      data => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
      },
      error => {
        console.log(error);
      }
    );
  }

  distance(lon1, lat1) {
    var R = 6371; // Radius of the earth in km
    var dLat = (this.latitude - lat1).toRad(); // Javascript functions in radians
    var dLon = (this.longitude - lon1).toRad();
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1.toRad()) *
        Math.cos(this.latitude.toRad()) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.floor(d);
  }
}
