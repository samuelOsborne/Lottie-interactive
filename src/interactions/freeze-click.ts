import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class FreezeClick extends BaseInteraction {
    private readonly freezeClickHandler: any;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.FreezeClick;
        this.freezeClickHandler = this.freezeClick.bind(this);
        this.initListener();
    }

    private freezeClick(): void {
        this.freezeAnimation();
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("complete", () => {
                this.lottiePlayer.goToAndStop(0, true);
            });
        }
    }


    private initListener(): void {
        this.animationContainer.addEventListener('click', this.freezeClickHandler);
    }

    public removeListener(): void {
        this.animationContainer.removeEventListener('click', this.freezeClickHandler);
    }

    private freezeAnimation(): void {
        this.playing ? this.pauseAnimation() : this.resumeAnimation();
    }

    private resumeAnimation(): void {
        if (!this.playing)
        {
            this.lottiePlayer.play();
            this.playing = true;
        }
    }

    private pauseAnimation(): void {
        if (this.playing)
        {
            this.lottiePlayer.pause();
            this.playing = false;
        }
    }
}
