import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class MorphLock extends BaseInteraction {
    private direction: number = -1;
    private locked: boolean = false;
    private readonly morphLockHandler: any;
    private readonly morphLockAnimationHandler: any;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.MorphLock;
        this.morphLockHandler = this.playOnHover.bind(this);
        this.morphLockAnimationHandler = this.lockAnimation.bind(this);
        this.initListener();
    }

    private initListener(): void {
        this.animationContainer.addEventListener('mouseenter', this.morphLockHandler);
        this.animationContainer.addEventListener('mouseleave', this.morphLockHandler);
        this.animationContainer.addEventListener('click', this.morphLockAnimationHandler);
    }

    public removeListener(): void {
        this.animationContainer.removeEventListener('mouseenter', this.morphLockHandler);
        this.animationContainer.removeEventListener('mouseleave', this.morphLockHandler);
        this.animationContainer.removeEventListener('click', this.morphLockAnimationHandler);
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
        if (!this.locked) {
            if (this.playOnce && !this.played) {
                this.playMorphedAnimation();
                this.played = true;
            } else if (!this.playOnce) {
                this.playMorphedAnimation();
            }
        }
    }}
