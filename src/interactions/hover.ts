import { LottiePlayer } from "Lottie-web";
import { BaseInteraction } from "./base-interaction";

export class OnHover extends BaseInteraction {
    constructor(player: LottiePlayer) {
        super(player);
        this.playing = false;
    }

    public playOnHover() {
        if (!this.playing)
        {
            this.playing = true;
            this.lottiePlayer.setDirection(1);
            console.log("PLAYING ANIMATION");
            this.lottiePlayer.goToAndPlay(0, true);
        }
    }
}
