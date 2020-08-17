import lottie from 'lottie-web'

class LottieInteractive extends HTMLElement {
  constructor() {
    super();

    this.path = this.getAttribute('path');

    this.style.width = '500px';
    this.style.height = '500px';
    this.style.backgroundColor = '#850ed7'
    this.style.display = 'block';

    this.loadAnimation(this.path)
  };

  loadAnimation(path) {
    lottie.loadAnimation({
      container: this, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: path // the path to the animation json
    })
  }
}

customElements.define('lottie-interactive', LottieInteractive);
