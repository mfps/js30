class WebRTCVideo {
  constructor() {
    this.video = document.querySelector('.player');
    this.canvas = document.querySelector('.photo');
    this.ctx = this.canvas.getContext('2d');
    this.strip = document.querySelector('.strip');
    this.snap = document.querySelector('.snap');

    this.takePhotoBtn = document.getElementById('take-photo');

    this.render();

    this.eventHandler();
  }

  eventHandler() {
    this.takePhotoBtn.addEventListener('click', e => this.takePhoto());
  }

  getVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(mediaStream => {
        this.video.src = window.URL.createObjectURL(mediaStream);
        this.video.play();
      })
      .catch(error => console.log(error));
  }

  paintToCanvas() {
    const width = this.video.videoWidth;
    const height = this.video.videoHeight;
    this.canvas.width = width;
    this.canvas.height = height;

    setInterval(() => {
      this.ctx.drawImage(this.video, 0, 0, width, height);
      this.ctx.drawImage(this.video, 0, 0, width, height);

      let pixels = this.ctx.getImageData(0, 0, width, height);
      pixels = this.greenScreen(pixels);

      this.ctx.putImageData(pixels, 0, 0);
    }, 16);
  }

  takePhoto() {
    this.snap.currentTime = 0;
    this.snap.play();

    const data = this.canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<image src="${data}" alt="that's me"/>`;
    this.strip.insertBefore(link, this.strip.firstChild);
  }

  redEffect(pixels) {
    let i = 0;
    for (i; i < pixels.data.length; i += 4) {
      pixels.data[i] = pixels.data[i] + 100; // r
      pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
      pixels.data[i + 2] = pixels.data[1 + 2] * 0.5; //b
    }
    return pixels;
  }

  rgbSplit(pixels) {
    let i = 0;
    for (i; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i]; // r
      pixels.data[i + 500] = pixels.data[i + 1]; //g
      pixels.data[i + 150] = pixels.data[1 + 2]; //b
    }
    return pixels;
  }

  greenScreen(pixels) {
    const levels = [];
    document.querySelectorAll('.rgb input').forEach(input => {
      levels[input.name] = input.value;
    });

    let i = 0, red, green, blue, alpha;
    for (i; i < pixels.data.length; i += 4) {
      red = pixels.data[i];
      green = pixels.data[i + 1];
      blue = pixels.data[1 + 2];
      alpha = pixels.data[i + 3];

      if (
        red >= levels.rmin &&
        green >= levels.gmin &&
        blue >= levels.bmin &&
        red <= levels.rmax &&
        green <= levels.gmax &&
        blue <= levels.bmax
      ) {
        pixels.data[i + 3] = 0;
      }
    }
    return pixels;
  }

  render() {
    this.getVideo();

    this.video.addEventListener('canplay', () => this.paintToCanvas());
  }
}

(() => {
  new WebRTCVideo();
})();
