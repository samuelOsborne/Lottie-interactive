import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class Morph extends BaseInteraction {
    private readonly morphHandler: any;
    private direction: number = -1;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.Morph;
        this.morphHandler = this.playOnHover.bind(this);
        this.initListener();
    }

    private initListener(): void {
        this.animationContainer.addEventListener('mouseenter', this.morphHandler);
        this.animationContainer.addEventListener('mouseleave', this.morphHandler);
    }

    public removeListener(): void {
        this.animationContainer.removeEventListener('mouseenter', this.morphHandler);
        this.animationContainer.removeEventListener('mouseleave', this.morphHandler);
    }

    private playMorphedAnimation(): void {
        if (this.direction === -1)
        {
            this.direction = 1;
            this.playing = true;
            this.lottiePlayer.setDirection(this.direction);
        } else if (this.direction === 1) {
            this.direction = -1;
            this.playing = true;
            this.lottiePlayer.setDirection(this.direction);
        }
        this.lottiePlayer.play();
    }

    public playOnHover(): void {
        if (this.playOnce && !this.played) {
            this.playMorphedAnimation();
            this.played = true;
        } else if (!this.playOnce) {
            this.playMorphedAnimation();
        }
    }}
