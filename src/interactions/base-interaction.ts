import { LottiePlayer } from "Lottie-web";
import { InteractionType } from "./interaction-type";

export class BaseInteraction {
    protected readonly lottiePlayer: LottiePlayer
    protected playing: boolean;
    protected element: HTMLElement;
    public interactionType: InteractionType;
    public active: Boolean = false;
    public reset: Boolean = true;

    constructor(player: LottiePlayer, element: HTMLElement) {
        this.lottiePlayer = player;
        this.element = element;
        this.playing = false;
        this.active = false;
        this.registerEndingListener();
    }

    private registerEndingListener() {
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("complete", ()=> {
                this.playing = false;
                if (this.reset) {
                    this.lottiePlayer.goToAndStop(0, true);
                }
            });
        }
    }
}
