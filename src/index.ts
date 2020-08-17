import Lottie, {LottiePlayer} from 'Lottie-web'

const styling = `
  :host {
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    background-color: #850ed7
  }
  div {
    width: 100%;
    height: 100%;
  }
`;

class LottieInteractive extends HTMLElement {
    public path: string;
    public lottie: LottiePlayer;


    constructor() {
        super();

        this.path = this.getAttribute('path');
        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.innerHTML = styling;
        shadowRoot.appendChild(style);
        const container = document.createElement('div');
        shadowRoot.appendChild(container);
        this.loadAnimation(this.path, container);
    };

    loadAnimation(path: string, container: Element) {
        this.lottie = Lottie.loadAnimation({
            container: container, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path // the path to the animation json
        });
    }
}

customElements.define('lottie-interactive', LottieInteractive);

export default LottieInteractive;
