import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class Switch extends BaseInteraction {
    private direction: number = -1;
    private readonly switchHandler: any;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.Switch;
        this.switchHandler = this.playOnClick.bind(this);
        this.initListener();
    }

    private initListener(): void {
        this.animationContainer.addEventListener('click', this.switchHandler);
    }

    public removeListener(): void {
        this.animationContainer.removeEventListener('click', this.switchHandler);
    }

    private playSwitchAnimation(): void {
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

    public playOnClick(): void {
        if (this.playOnce && !this.played) {
            this.playSwitchAnimation();
            this.played = true;
        } else if (!this.playOnce) {
            this.playSwitchAnimation();
        }
    }
}
