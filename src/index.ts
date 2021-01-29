import Lottie, {LottiePlayer} from 'Lottie-web'

import {BaseInteraction} from "./interactions/base-interaction";
import {Hover} from './interactions/hover'
import {Click} from "./interactions/click";
import {Morph} from "./interactions/morph";
import {Switch} from "./interactions/switch";
import {PlayOnShow} from "./interactions/play-on-show";
import {PlayOnce} from "./interactions/play-once";

import {Stroke} from "./modifiers/stroke";


const OBSERVED_ATTRIBUTES = [
    "s-width",
    "s-color"
]

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
    private strokeColor: string = null;
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
        if (this.path === null) {
            console.error("[Lottie-interactive] Path to JSON animation data is null!");
            return;
        }
        try {
            const response = await fetch(this.path);
            this.data = await response.json();
        } catch (e) {
            console.error("[Lottie-interactive] Your JSON data could not be loaded.");
            return ;
        }
        Stroke.changeStrokeWidthColor(this.data, this.strokeWidth, this.strokeColor);
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
        if (this.hasAttribute('s-width')) {
            this.strokeWidth = this.getAttribute('s-width');
        }
        if (this.hasAttribute('s-color')) {
            this.strokeColor = this.getAttribute('s-color');
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

    static get observedAttributes() {
        return OBSERVED_ATTRIBUTES;
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        switch (name) {
            case 's-width':
                this.strokeWidth = newValue;
                Stroke.changeWidth(this.data, this.strokeWidth);
                if (this.lottie != null) {
                    this.lottie.destroy();
                    this.loadAnimation();
                }
                break;
            case 's-color':
                this.strokeColor = newValue;
                Stroke.changeColor(this.data, this.strokeColor);
                if (this.lottie != null) {
                    this.lottie.destroy();
                    this.loadAnimation();
                }
                break;
        }
    }
}

customElements.define('lottie-interactive', LottieInteractive);
