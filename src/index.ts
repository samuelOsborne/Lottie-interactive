import Lottie, { LottiePlayer } from 'Lottie-web'
import { BaseInteraction } from "./interactions/base-interaction";
import { Hover } from './interactions/hover'
import { Click } from "./interactions/click";
import {Morph} from "./interactions/morph";
import {Switch} from "./interactions/switch";
import {PlayOnShow} from "./interactions/play-on-show";

const styling = `
  :host {
    // width: 100px;
    // height: 100px;
    justify-content: center;
    align-items: center;
    display: inline-flex;
  }
  div {
    width: 100%;
    height: 100%;
  }
`;

class LottieInteractive extends HTMLElement {
    public path: string;
    public lottie: LottiePlayer;

    private hover: Hover;
    private onClick: Click;
    private morph: Morph;
    private switch: Switch;
    private playOnShow: PlayOnShow;

    private interaction: String;
    private loop: boolean = false;
    private autoplay: boolean = false;
    private reset: boolean = true;

    private interactions: Array<BaseInteraction>;
    public readonly element: HTMLElement;
    private animationContainer: HTMLElement;

    constructor() {
        super();

        this.element = this;
        this.initShadowRoot();
        this.checkAttributes();
        this.loadAnimation(this.path, this.animationContainer);
        this.initInteractions();
    };

    // Add interactions to an array
    private initInteractions() {
        this.hover = new Hover(this.lottie, this.animationContainer);
        this.hover.reset = this.reset;

        this.onClick = new Click(this.lottie, this.animationContainer);
        this.onClick.reset = this.reset;

        this.morph = new Morph(this.lottie, this.animationContainer);
        this.morph.reset = this.reset;

        this.switch = new Switch(this.lottie, this.animationContainer);
        this.switch.reset = this.reset;

        this.playOnShow = new PlayOnShow(this.lottie, this.animationContainer);
        this.playOnShow.reset = this.reset;

        switch (this.interaction) {
            case 'click': {
                this.onClick.active = true;
                break;
            }
            case 'hover': {
                this.hover.active = true;
                break;
            }
            case 'morph': {
                this.morph.active = true;
                break;
            }
            case 'switch': {
                this.switch.active = true;
                break;
            }
            case 'play-on-show': {
                this.playOnShow.active = true;
                break;
            }
        }
        // this.interactions.push(new Hover(this.lottie, this.animationContainer));
        // this.interactions.push(new Click(this.lottie, this.animationContainer));
    }

    // Create a map of attributes and their expected values
    // Check in loop
    private checkAttributes() {
        this.path = this.getAttribute('path');
        this.interaction = this.getAttribute('interaction');

        // for (let inter of this.interactions) {
        //     if (inter.interactionType === interaction) {
        //         inter.active = true;
        //     }
        // }

        if (this.getAttribute('reset') === 'false') {
            this.reset = false;
        }
        if (this.getAttribute('loop') === 'true') {
            this.loop = true;
        }
        if (this.getAttribute('autoplay') === 'true') {
            this.autoplay = true;
        }
    }

    private initShadowRoot() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');

        style.innerHTML = styling;
        shadowRoot.appendChild(style);
        this.animationContainer = document.createElement('div');
        shadowRoot.appendChild(this.animationContainer);
    }

    loadAnimation(path: string, container: Element) {
        this.lottie = Lottie.loadAnimation({
            container: container, // the dom element that will contain the animation
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.autoplay,
            path: path // the path to the animation json
        });
    }
}

customElements.define('lottie-interactive', LottieInteractive);

export default LottieInteractive;
