import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class PlayOnShow extends BaseInteraction {
    private observer: IntersectionObserver;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.PlayOnShow;
        this.initListener();
    }

    private initListener(): void {
        this.observer = new IntersectionObserver(this.detectIfShowing.bind(this), { threshold: [1] });
        this.observer.observe(this.animationContainer);
    }

    private detectIfShowing(entries : IntersectionObserverEntry[]): void {
        if(entries[0].isIntersecting === true) {
            this.playAnimation();
        }
    }

    public removeListener(): void {
        this.observer.disconnect();
    }
}
