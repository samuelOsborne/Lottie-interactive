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
import {FreezeClick} from "./interactions/freeze-click";
import {ShowAndClick} from "./interactions/show-and-click";
import {ShowAndHover} from "./interactions/show-and-hover";
import {ShowAndMorph} from "./interactions/show-and-morph";
import {ShowAndMorphLock} from "./interactions/show-and-morph-lock";
import {ShowAndFreezeClick} from "./interactions/show-and-freeze-click";
import {ShowAndSwitch} from "./interactions/show-and-switch";

import {Stroke} from "./modifiers/stroke";
import {InteractionType} from "./interactions/interaction-type";

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
    @attr({ mode: 'boolean', attribute: 'play-once' }) playOnce: boolean = false;
    playOnceChanged(oldValue: boolean, newValue: boolean) {
        this.playOnce = newValue;
    }
    /**
     * Path or URL to the animation
     * @public
     */
    @attr path: string;
    pathChanged(oldValue: string, newValue: string) {
        if (!this.lottieLoading && oldValue) {
            this.path = newValue;
            this.deloadLottie();
            this.loadIconData();
        }
    }

    /**
     * Desired interaction to have with the animation
     * @public
     */
    @attr interaction: string;
    interactionChanged(oldValue: string, newValue: string) {
        this.interaction = newValue;
        this.initInteraction();
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
    @attr delay: number = 0;
    delayChanged(oldValue: number, newValue: number) {
        this.delay = newValue;
    }


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
    @attr({ attribute: 'aspect-ratio' }) aspectRatio: string = 'xMidYMid slice';
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
    @attr({attribute: 's-width'}) strokeWidth: string = null;
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
    @attr({attribute: 's-color' }) strokeColor: string = null;
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
    @attr({attribute: 'view-box' }) viewBox: string = null;
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
    //private interactions: Array<BaseInteraction>;
    private currentInteraction: BaseInteraction;

    /**
     * The HTML div that contains our Lottie animation
     * @private
     */
    private animationContainer: HTMLElement = undefined;

    /**
     * Fetches the animation data, on success it will then load the animation
     * @private
     */
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

    /**
     * Create the correct interaction with the Lottie animation depending on the 'interaction' attribute value
     * @private
     */
    private initInteraction() {
        if (!this.lottie || !this.interaction)
            return ;
        if (this.currentInteraction) {
            this.currentInteraction.removeListener();
            delete(this.currentInteraction);
        }
        switch (this.interaction) {
            case InteractionType.Hover:
                this.currentInteraction = new Hover(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.Click:
                this.currentInteraction = new Click(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.Morph:
                this.currentInteraction = new Morph(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.FreezeClick:
                this.currentInteraction = new FreezeClick(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.MorphLock:
                this.currentInteraction = new MorphLock(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.Switch:
                this.currentInteraction = new Switch(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.PlayOnShow:
                this.currentInteraction = new PlayOnShow(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.ShowAndClick:
                this.currentInteraction = new ShowAndClick(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.ShowAndHover:
                this.currentInteraction = new ShowAndHover(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.ShowAndMorph:
                this.currentInteraction = new ShowAndMorph(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.ShowAndMorphLock:
                this.currentInteraction = new ShowAndMorphLock(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.ShowAndFreezeClick:
                this.currentInteraction = new ShowAndFreezeClick(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.ShowAndSwitch:
                this.currentInteraction = new ShowAndSwitch(this.lottie, this.animationContainer, this);
                break;
            case InteractionType.PlayOnce:
                this.currentInteraction = new PlayOnce(this.lottie, this.animationContainer, this);
                break;
        }
        this.currentInteraction.reset = this.reset;
        this.currentInteraction.playOnce = this.playOnce;
        this.currentInteraction.playing = this.autoplay;
    }

    /**
     * Apply styling to the animation container
     * @private
     */
    private initShadowRoot() {
        const style = document.createElement('style');
        style.innerHTML = styling;
        this.shadowRoot.appendChild(style);
        this.animationContainer = document.createElement('div');
        this.shadowRoot.appendChild(this.animationContainer);
    }

    /**
     * Load the Lottie animation via lottie-web
     * @private
     */
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
                this.initInteraction();
                this.lottieLoading = false;
            });
        }, this.delay)
    }

    /**
     * Destroys the Lottie animation
     * @private
     */
    private deloadLottie() {
        if (this.lottie) {
            this.lottie.destroy();
            this.lottie = undefined;
            this.shadowRoot.lastElementChild.innerHTML = "";
            this.currentInteraction.removeListener();
            delete this.currentInteraction;
        }
    }
}
