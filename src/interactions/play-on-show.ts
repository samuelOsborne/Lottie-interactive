import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class PlayOnShow extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.PlayOnShow;
        this.initListener();
    }

    private initListener() {
        var observer = new IntersectionObserver(this.detectIfShowing.bind(this), { threshold: [1] });
        observer.observe(this.element);
    }

    private detectIfShowing(entries : IntersectionObserverEntry[]) {
        if(entries[0].isIntersecting === true) {
            this.playAnimation();
        }
    }

    public removeListener() {
    }
}
