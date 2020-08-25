import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Click extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Click;
        this.initListener();
    }

    private initListener(): void {
        this.element.addEventListener('click', this.playAnimation.bind(this));
    }

    public removeListener(): void {
        this.element.removeEventListener('click', this.playAnimation.bind(this));
    }
}
