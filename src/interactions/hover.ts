import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Hover extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Hover;
        this.initListener();
    }

    private initListener() {
        this.element.addEventListener('mouseenter', this.playOnHover.bind(this));
    }

    private removeListener() {
        this.element.removeEventListener('mouseenter', this.playOnHover.bind(this));
    }

    public playOnHover() {
        if (!this.playing && this.active)
        {
            this.playing = true;
            this.lottiePlayer.setDirection(1);
            this.lottiePlayer.goToAndPlay(0, true);
        }
    }
}