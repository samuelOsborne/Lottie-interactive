import { LottiePlayer } from "Lottie-web";
import { InteractionType } from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export abstract class BaseInteraction {
    protected readonly lottiePlayer: LottiePlayer
    protected played: boolean = false;
    protected ready: boolean = false;
    protected animationContainer: HTMLElement;
    protected fastElement: FASTElement;
    public interactionType: InteractionType;
    public playing: boolean = false;
    public reset: boolean = false;
    public playOnce: boolean = false;

    abstract removeListener(): void;

    protected constructor(player: LottiePlayer,
                          animationContainer: HTMLElement,
                          fastElement: FASTElement) {
        this.lottiePlayer = player;
        this.animationContainer = animationContainer;
        this.fastElement = fastElement;
        this.registerCompleteListener();
        this.registerReadyListener();
        this.registerDestroyListener();
    }

    protected playAnimation(): void {
        if (!this.playing)
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
                this.fastElement.$emit("complete");
                this.playing = false;
                if (this.reset) {
                    this.lottiePlayer.goToAndStop(0, true);
                }
            });
        }
    }

    private registerReadyListener(): void {
        if (this.lottiePlayer !== null) {
            this.lottiePlayer.addEventListener("data_ready", () => {
                this.fastElement.$emit("data_ready");
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
