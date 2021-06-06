import Lottie, {LottiePlayer} from 'Lottie-web'
import {customElement, FASTElement, attr} from "@microsoft/fast-element";

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


export const enum OBSERVED_ATTRIBUTES {
    LOOP = "loop",
    SWIDTH = "s-width",
    SCOLOR = "s-color",
    AUTOPLAY = "autoplay",
    RESET = "reset",
    ASPECTRATIO = "aspect-ratio",
    PATH = "path",
    INTERACTION = "interaction",
    SPEED = "speed",
    VIEWBOX = "view-box"
}

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

@customElement('lottie-interactive')
export class LottieInteractive extends FASTElement {
    constructor() {
        super();
        this.initShadowRoot();
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadIconData();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.deloadLottie();
    }

    /**
     * Lottie player object returned from loadAnimation
     * @public
     */
    public lottie: LottiePlayer = null;

    /**
     * If the Lottie animation is currently being loaded
     * @private
     */
    private lottieLoading: boolean = false

    /**
     * Play the animation once
     * @public
     */
    @attr({ mode: 'boolean' }) playOnce: boolean = false;

    /**
     * Path to the animation
     * @public
     */
    @attr path: string;
    pathChanged(oldValue: string, newValue: string) {
        console.log("path changed | o : " + oldValue + " | n : " + newValue);
        this.path = newValue;
        if (!this.lottieLoading) {
            //this.deloadLottie();
            //this.checkAttributes();
            //this.loadIconData();
        }
    }

    /**
     * Desired interaction to have with the animation
     * @public
     */
    @attr interaction: string;
    interactionChanged(oldValue: string, newValue: string) {
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

    /**
     * Loop the animation
     * @public
     */
    @attr({ mode: 'boolean' }) loop: boolean = false;
    loopChanged(oldValue: boolean, newValue: boolean) {
        this.loop = newValue;
    }

    /**
     * Speed of the animation
     * @public
     */
    @attr speed: number = 1;
    speedChanged(oldValue: string, newValue: string) {
        this.speed = parseFloat(newValue);
        if (this.lottie)
            this.lottie.setSpeed(this.speed);
    }

    /**
     * Autoplay the animation on load
     * @public
     */
    @attr({ mode: 'boolean' }) autoplay: boolean = false;
    autoplayChanged(oldValue: boolean, newValue: boolean) {
        this.autoplay = newValue;
    }

    /**
     * Delay the animation, defined in milliseconds
     * @public
     */
    @attr({ mode: 'boolean' }) delay: number = 0;

    /**
     * Reset animation to the first frame when finished playing
     * @publc
     */
    @attr({ mode: 'boolean' }) reset: boolean = false;
    resetChanged(oldValue: boolean, newValue: boolean) {
        this.reset = newValue;
    }

    /**
     * Aspect-ratio of the animation
     * @public
     */
    @attr aspectRatio: string = 'xMidYMid slice';
    aspectRatioChanged(oldValue: string, newValue: string) {
        if (!this.lottieLoading && this.animationContainer) {
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

    /**
     * Stroke width of the animation
     * @public
     */
    @attr strokeWidth: string = null;
    strokeWidthChanged(oldValue: string, newValue: string) {
        if (this.lottie != null && this.animationContainer) {
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

    /**
     * Stroke color of the animation
     * @public
     */
    @attr strokeColor: string = null;
    strokeColorChanged(oldValue: string, newValue: string) {
        if (this.lottie != null && this.animationContainer) {
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

    /**
     * The view-box of the animation
     * @public
     */
    @attr viewBox: string = null;
    viewBoxChanged(oldValue: string, newValue: string) {
        if (!this.lottieLoading && this.animationContainer) {
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

    /**
     * The animation data
     * @private
     */
    private data: any;

    /**
     * Array of all the possible interactions
     * @private
     */
    private interactions: Array<BaseInteraction>;

    /**
     * The HTML div that contains our Lottie animation
     * @private
     */
    private animationContainer: HTMLElement = undefined;

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
            this.interactions[i].fastElement = this;
            this.interactions[i].reset = this.reset;
            this.interactions[i].playOnce = this.playOnce;
            this.interactions[i].playing = this.autoplay;
        }
    }

    private initShadowRoot() {
        const style = document.createElement('style');
        style.innerHTML = styling;
        this.shadowRoot.appendChild(style);
        this.animationContainer = document.createElement('div');
        this.shadowRoot.appendChild(this.animationContainer);
    }

    private loadAnimation() {
        console.log("LOOP: " + this.loop);
        console.log("THIS AUTOPLAY: " + this.autoplay);
        console.log("THIS SPEED: " + this.speed);

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
}