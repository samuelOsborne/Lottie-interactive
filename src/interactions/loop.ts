import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Loop extends BaseInteraction {
    removeListener(): void {
    }
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Loop;
    }

    public playOnLoop() {
        this.lottiePlayer.setDirection(1);

        // if (!this.playing)
        // {
        //     this.playing = true;
        //     this.lottiePlayer.setDirection(1);
        //     console.log("PLAYING ANIMATION");
        //     this.lottiePlayer.goToAndPlay(0, true);
        // }
    }
}
