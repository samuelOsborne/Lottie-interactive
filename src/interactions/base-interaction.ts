import { LottiePlayer } from "Lottie-web";
import { InteractionType } from "./interaction-type";

export abstract class BaseInteraction {
    protected readonly lottiePlayer: LottiePlayer
    protected played: boolean = false;
    protected ready: boolean = false;
    protected element: HTMLElement;
    public interactionType: InteractionType;
    public playing: boolean = false;
    public active: boolean = false;
    public reset: boolean = false;
    public playOnce: boolean = false;

    abstract removeListener(): void;

    protected constructor(player: LottiePlayer, element: HTMLElement) {
        this.lottiePlayer = player;
        this.element = element;
        this.registerCompleteListener();
        this.registerReadyListener();
        this.registerDestroyListener();
    }

    protected playAnimation(): void {
        if (!this.playing &&
            this.active)
        {
            if (this.playOnce && this.played)
                return ;
            this.playing = true;
            this.lottiePlayer.setDirection(1);
            this.lottiePlayer.goToAndPlay(0, true);
            this.played = true;
        }
    }

    private registerCompleteListener(): void {
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("complete", () => {
                this.playing = false;
                if (!this.active)
                    return ;
                if (this.reset === true) {
                    this.lottiePlayer.goToAndStop(0, true);
                }
            });
        }
    }

    private registerReadyListener(): void {
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("data_ready", () => {
                this.ready = true;
            });
        }
    }

    private registerDestroyListener(): void {
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("destroy", () => {
                this.removeListener();
            });
        }
    }
}
