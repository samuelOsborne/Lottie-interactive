import { LottiePlayer } from "Lottie-web";
import { BaseInteraction } from "./base-interaction";

export class OnLoop extends BaseInteraction {
    constructor(player: LottiePlayer) {
        super(player);
        this.playing = false;
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
