import { LottiePlayer } from "Lottie-web";

export class BaseInteraction {
    protected readonly lottiePlayer: LottiePlayer
    protected playing: boolean;

    constructor(player: LottiePlayer) {
        this.lottiePlayer = player;
        this.playing = false;
        this.registerEndingListener();
    }

    private registerEndingListener() {
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("complete", ()=> {
                this.playing = false;
                console.log("Animation has finished playing")
            });
        }
    }
}
