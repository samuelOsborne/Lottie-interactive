import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class MorphLock extends BaseInteraction {
    private direction: number = -1;
    private locked: boolean = false;

    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.MorphLock;
        this.initListener();
    }

    private initListener(): void {
        this.element.addEventListener('mouseenter', this.playOnHover.bind(this));
        this.element.addEventListener('mouseleave', this.playOnHover.bind(this));
        this.element.addEventListener('click', this.lockAnimation.bind(this));
    }

    public removeListener(): void {
        this.element.removeEventListener('mouseenter', this.playOnHover.bind(this));
        this.element.removeEventListener('mouseleave', this.playOnHover.bind(this));
        this.element.removeEventListener('click', this.lockAnimation.bind(this));
    }

    private lockAnimation(): void {
        this.locked = !this.locked;
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
        if (this.active && !this.locked) {
            if (this.playOnce && !this.played) {
                this.playMorphedAnimation();
                this.played = true;
            } else if (!this.playOnce) {
                this.playMorphedAnimation();
            }
        }
    }}
