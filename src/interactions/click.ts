import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Click extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Click;
        this.initListener();
    }

    private initListener() {
        this.element.addEventListener('click', this.playOnClick.bind(this));
    }

    private removeListener() {
        this.element.removeEventListener('click', this.playOnClick.bind(this));
    }

    public playOnClick() {
        if (!this.playing && this.active)
        {
            this.playing = true;
            this.lottiePlayer.setDirection(1);
            this.lottiePlayer.goToAndPlay(0, true);
        }
    }
}
