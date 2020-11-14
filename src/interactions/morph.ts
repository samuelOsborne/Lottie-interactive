import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Morph extends BaseInteraction {
    private direction: number = -1;

    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Morph;
        this.initListener();
    }

    private initListener(): void {
        this.element.addEventListener('mouseenter', this.playOnHover.bind(this));
        this.element.addEventListener('mouseleave', this.playOnHover.bind(this));
    }

    public removeListener(): void {
        this.element.removeEventListener('mouseenter', this.playOnHover.bind(this));
        this.element.removeEventListener('mouseleave', this.playOnHover.bind(this));
    }

    private playMorphedAnimation(): void {
        if (this.direction === -1)
        {
            this.direction = 1;
            this.playing = true;
            this.lottiePlayer.setDirection(this.direction);
            this.lottiePlayer.goToAndPlay(0, true);
        } else if (this.direction === 1) {
            this.direction = -1;
            this.playing = true;
            this.lottiePlayer.setDirection(this.direction);
            this.lottiePlayer.play();
        }
    }

    public playOnHover(): void {
        if (this.active) {
            if (this.playOnce && !this.played) {
                this.playMorphedAnimation();
                this.played = true;
            } else if (!this.playOnce) {
                this.playMorphedAnimation();
            }
        }
    }}
