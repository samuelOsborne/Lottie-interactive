import Lottie, {LottiePlayer} from 'Lottie-web'

import {BaseInteraction} from "./interactions/base-interaction";
import {Hover} from './interactions/hover'
import {Click} from "./interactions/click";
import {Morph} from "./interactions/morph";
import {Switch} from "./interactions/switch";
import {PlayOnShow} from "./interactions/play-on-show";
import {PlayOnce} from "./interactions/play-once";

import {Stroke} from "./modifiers/stroke";

const styling = `
  :host {
    justify-content: center;
    align-items: center;
    display: inline-flex;
  }
  div {
    width: 100%;
    height: 100%;
  }
`;

export class LottieInteractive extends HTMLElement {
    public path: string;
    public lottie: LottiePlayer = null;

    private playOnce: boolean = false;
    private interaction: string;
    private loop: boolean = false;
    private autoplay: boolean = false;
    private reset: boolean = false;
    private aspectRatio: string = 'xMidYMid slice';
    private strokeWidth: string = null;
    private data: any;

    private interactions: Array<BaseInteraction> = new Array<BaseInteraction>();
    private animationContainer: HTMLElement;

    constructor() {
        super();

        this.initShadowRoot();
        this.checkAttributes();
        this.loadIconData();
    }

    private async loadIconData() {
        try {
            const response = await fetch(this.path);
            this.data = await response.json();
        } catch (e) {
            console.error("Lottie-interactive: Your JSON data could not be loaded.");
            return ;
        }
        if (this.strokeWidth !== null)
            Stroke.changeWidth(this.data, this.strokeWidth);
        this.loadAnimation();
        this.initInteractions();
    }

    private initInteractions() {
        this.interactions.push(new Hover(this.lottie, this.animationContainer));
        this.interactions.push(new Click(this.lottie, this.animationContainer));
        this.interactions.push(new Morph(this.lottie, this.animationContainer));
        this.interactions.push(new Switch(this.lottie, this.animationContainer));
        this.interactions.push(new PlayOnShow(this.lottie, this.animationContainer));
        this.interactions.push(new PlayOnce(this.lottie, this.animationContainer));

        for (let i = 0; i < this.interactions.length; i++) {
            if (this.interactions[i].interactionType === this.interaction) {
                this.interactions[i].active = true;
                this.interactions[i].reset = this.reset;
                this.interactions[i].playOnce = this.playOnce;
            }
        }
    }

    private checkAttributes() {
        this.path = this.getAttribute('path');
        this.interaction = this.getAttribute('interaction');

        if (this.hasAttribute('play-once')) {
            this.playOnce = true;
        }
        if (this.hasAttribute('reset')) {
            this.reset = true;
        }
        if (this.hasAttribute('loop')) {
            this.loop = true;
        }
        if (this.hasAttribute('autoplay')) {
            this.autoplay = true;
        }
        if (this.hasAttribute('aspect-ratio')) {
            this.aspectRatio = this.getAttribute('aspect-ratio');
        }
        if (this.hasAttribute('stroke')) {
            this.strokeWidth = this.getAttribute('stroke');
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

    private loadAnimation() {
        this.lottie = Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.autoplay,
            animationData: this.data,
            rendererSettings: {
                preserveAspectRatio: this.aspectRatio
            }
        });
    }
}

customElements.define('lottie-interactive', LottieInteractive);
