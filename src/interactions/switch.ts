import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Switch extends BaseInteraction {
    private direction: number = -1;

    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Switch;
        this.initListener();
    }

    private initListener() {
        this.element.addEventListener('click', this.playOnClick.bind(this));
    }

    private removeListener() {
        this.element.removeEventListener('click', this.playOnClick.bind(this));
    }

    public playOnClick() {
        if (this.active)
        {
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
    }
}