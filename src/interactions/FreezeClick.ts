import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class FreezeClick extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.FreezeClick;
        this.initListener();
    }

    private initListener(): void {
        this.element.addEventListener('click', this.freezeAnimation.bind(this));
    }

    public removeListener(): void {
        this.element.removeEventListener('click', this.freezeAnimation.bind(this));
    }

    private freezeAnimation(): void {
        this.playing ? this.pauseAnimation() : this.resumeAnimation();
    }

    private resumeAnimation(): void {
        this.reset = true;
        if (!this.playing &&
            this.active)
        {
            this.lottiePlayer.play();
            this.playing = true;
        }
    }

    private pauseAnimation(): void {
        if (this.playing &&
            this.active)
        {
            this.lottiePlayer.pause();
            this.playing = false;
        }
    }
}
