import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Hover extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Hover;
        this.initListener();
    }

    private initListener(): void {
        this.element.addEventListener('mouseenter', this.playAnimation.bind(this));
    }

    public removeListener(): void {
        this.element.removeEventListener('mouseenter', this.playAnimation.bind(this));
    }
}
