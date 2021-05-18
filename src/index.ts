import Lottie, {LottiePlayer} from 'Lottie-web'

import {BaseInteraction} from "./interactions/base-interaction";
import {Hover} from './interactions/hover'
import {Click} from "./interactions/click";
import {Morph} from "./interactions/morph";
import {MorphLock} from "./interactions/morph-lock";
import {Switch} from "./interactions/switch";
import {PlayOnShow} from "./interactions/play-on-show";
import {PlayOnce} from "./interactions/play-once";
import {FreezeClick} from "./interactions/FreezeClick";

import {Stroke} from "./modifiers/stroke";


const OBSERVED_ATTRIBUTES = [
    "loop",
    "s-width",
    "s-color",
    "autoplay",
    "reset",
    "aspect-ratio",
    "path",
    "interaction",
    "speed",
    "view-box"
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
    margin: auto;
  }
`;

export class LottieInteractive extends HTMLElement {
    public path: string;
    public lottie: LottiePlayer = null;

    private lottieLoading: boolean = false
    private playOnce: boolean = false;
    private interaction: string;
    private loop: boolean = false;
    private speed: number = 1;
    private autoplay: boolean = false;
    private delay: number = 0;
    private reset: boolean = false;
    private aspectRatio: string = 'xMidYMid slice';
    private strokeWidth: string = null;
    private strokeColor: string = null;
    private viewBox: string = null;
    private data: any;

    private interactions: Array<BaseInteraction>;
    private animationContainer: HTMLElement = undefined;

    constructor() {
        super();

        this.initShadowRoot();
        this.checkAttributes();
        this.loadIconData();
    }

    private async loadIconData() {
        this.lottieLoading = true;
        if (this.path === null) {
            this.lottieLoading = false;
            this.lottie = null;
            return;
        }
        try {
            const response = await fetch(this.path);
            if (!response.ok)
                throw new Error()
            this.data = await response.json();
        } catch (e) {
            console.error("[Lottie-interactive] Your JSON data could not be loaded.");
            this.lottieLoading = false;
            return ;
        }
        Stroke.changeStrokeWidthColor(this.data, this.strokeWidth, this.strokeColor);
        this.loadAnimation();
    }

    private initInteractions() {
        this.interactions = new Array<BaseInteraction>();
        this.interactions.push(new Hover(this.lottie, this.animationContainer));
        this.interactions.push(new Click(this.lottie, this.animationContainer));
        this.interactions.push(new Morph(this.lottie, this.animationContainer));
        this.interactions.push(new FreezeClick(this.lottie, this.animationContainer));
        this.interactions.push(new MorphLock(this.lottie, this.animationContainer));
        this.interactions.push(new Switch(this.lottie, this.animationContainer));
        this.interactions.push(new PlayOnShow(this.lottie, this.animationContainer));
        this.interactions.push(new PlayOnce(this.lottie, this.animationContainer));

        for (let i = 0; i < this.interactions.length; i++) {
            if (this.interactions[i].interactionType === this.interaction) {
                this.interactions[i].active = true;
            }
            this.interactions[i].reset = this.reset;
            this.interactions[i].playOnce = this.playOnce;
            this.interactions[i].playing = this.autoplay;
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
        if (this.hasAttribute('delay')) {
            this.delay = parseInt(this.getAttribute("delay"));
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
        if (this.hasAttribute('speed')) {
            this.speed = parseFloat(this.getAttribute('speed'));
        }
        if (this.hasAttribute('view-box')) {
            this.viewBox = this.getAttribute('view-box');
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
        setTimeout(() => {
            this.lottie = Lottie.loadAnimation({
                container: this.animationContainer,
                renderer: 'svg',
                loop: this.loop,
                autoplay: this.autoplay,
                animationData: this.data,
                rendererSettings: {
                    preserveAspectRatio: this.aspectRatio,
                    viewBoxSize: this.viewBox
                }
            });
            this.lottie.setSpeed(this.speed);
            this.lottie.addEventListener("DOMLoaded", ()=> {
                this.initInteractions();
                this.lottieLoading = false;
            });
        }, this.delay)
    }

    static get observedAttributes() {
        return OBSERVED_ATTRIBUTES;
    }

    private deloadLottie() {
        if (this.lottie !== null && this.lottie !== undefined) {
            this.lottie.destroy();
            this.lottie = undefined;
            this.shadowRoot.lastElementChild.innerHTML = "";
            for (let i = 0; i < this.interactions.length; i++) {
                this.interactions[i].removeListener();
                this.interactions[i].active = false;
                delete this.interactions[i];
            }
            delete this.interactions;
        }
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        switch (name) {
            case 's-width':
            {
                if (this.lottie != null) {
                    this.strokeWidth = newValue;
                    const children = this.animationContainer.children;

                    /**
                     * Our Lottie is already loaded, so all we need to is modify the stroke width of the rendered
                     * svg element
                     */
                    for (let i = 0; i < children.length; i++) {
                        const paths = Array.from(children[i].querySelectorAll("path"));
                        for (let j = 0; j < paths.length; j++) {
                            if (paths[j].hasAttribute("stroke-width")) {
                                paths[j].setAttribute("stroke-width", this.strokeWidth);
                            }
                        }
                    }
                }
            }
            break;
            case 's-color':
            {
                if (this.lottie != null) {
                    this.strokeColor = newValue;
                    const children = this.animationContainer.children;

                    /**
                     * Our Lottie is already loaded, so all we need to is modify the stroke color of the rendered
                     * svg element
                     */
                    for (let i = 0; i < children.length; i++) {
                        const paths = Array.from(children[i].querySelectorAll("path"));
                        for (let j = 0; j < paths.length; j++) {
                            if (paths[j].hasAttribute("stroke")) {
                                paths[j].setAttribute("stroke", this.strokeColor);
                            }
                        }
                    }
                }
            }
            break;
            case 'path':
            {
                if (!this.lottieLoading) {
                    this.path = newValue;
                    this.deloadLottie();
                    this.checkAttributes();
                    this.loadIconData();
                }
            }
            break;
            case 'interaction':
            {
                this.interaction = newValue;
                if (this.interactions === undefined)
                    return ;
                for (let i = 0; i < this.interactions.length; i++) {
                    if (this.interactions[i].interactionType === this.interaction) {
                        this.interactions[i].active = true;
                        this.interactions[i].reset = this.reset;
                        this.interactions[i].playOnce = this.playOnce;
                    } else {
                        this.interactions[i].active = false;
                    }
                }
            }
            break;
            case 'speed':
            {
                this.speed = parseFloat(newValue);
                if (this.lottie)
                    this.lottie.setSpeed(this.speed);
            }
            break;
            case 'view-box':
            {
                if (!this.lottieLoading) {
                    this.viewBox = newValue;
                    const children = this.animationContainer.children;

                    /**
                     * Our Lottie is already loaded, change the viewbox of the rendered SVG element
                     */
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].hasAttribute("viewBox")) {
                            children[i].setAttribute("viewBox", this.viewBox);
                        }
                    }
                }
            }
            break;
            case 'loop':
            {
                newValue === null ? this.loop = false : this.loop = true;
            }
            break;
            case 'autoplay':
            {
                newValue === null ? this.autoplay = false : this.autoplay = true;
            }
            break;
            case 'reset':
            {
                newValue === null ? this.reset = false : this.reset = true;
            }
            break;
            case 'aspect-ratio':
            {
                if (!this.lottieLoading) {
                    this.aspectRatio = newValue;
                    const children = this.animationContainer.children;

                    /**
                     * Our Lottie is already loaded, change the aspect-ratio of the rendered SVG element
                     */
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].hasAttribute("preserveAspectRatio")) {
                            children[i].setAttribute("preserveAspectRatio", this.aspectRatio);
                        }
                    }
                }
            }
            break;
        }
    }
}

customElements.define('lottie-interactive', LottieInteractive);
