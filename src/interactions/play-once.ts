import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class PlayOnce extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.PlayOnce;
        this.playOnce = true;
        this.playAnimation();
    }

    removeListener(): void {
        return ;
    }
}
