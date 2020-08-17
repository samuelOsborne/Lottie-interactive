import Lottie, { LottiePlayer } from 'Lottie-web'
import { OnHover } from './interactions/hover'
import { OnClick } from "./interactions/click";

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
    private hover: OnHover;
    private onClick: OnClick;
    private readonly loop: boolean = false;
    private readonly autoplay: boolean = false;

    constructor() {
        super();

        this.path = this.getAttribute('path');
        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.innerHTML = styling;
        shadowRoot.appendChild(style);
        const container = document.createElement('div');
        shadowRoot.appendChild(container);

        if (this.getAttribute('loop') === 'true') {
            this.loop = true;
        }
        if (this.getAttribute('autoplay') === 'true') {
            this.autoplay = true;
        }

        this.loadAnimation(this.path, container);

        this.hover = new OnHover(this.lottie);
        this.onClick = new OnClick(this.lottie);
        this.registerListeners();
    };

    loadAnimation(path: string, container: Element) {
        this.lottie = Lottie.loadAnimation({
            container: container, // the dom element that will contain the animation
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.autoplay,
            path: path // the path to the animation json
        });
    }

    private registerListeners() {
        if (this.getAttribute('interaction') === 'hover') {
            this.addEventListener('mouseenter', e => {
                this.hover.playOnHover();
            });
        }
        // this.addEventListener('mouseleave', e => {
        //     this.hover.playOnHover();
        // });
        if (this.getAttribute('interaction') === 'click') {
            this.addEventListener('click', e => {
                this.onClick.playOnClick();
            });
        }
    }
}

customElements.define('lottie-interactive', LottieInteractive);

export default LottieInteractive;
