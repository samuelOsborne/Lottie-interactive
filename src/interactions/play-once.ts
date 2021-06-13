import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class PlayOnce extends BaseInteraction {
    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.PlayOnce;
        this.playOnce = true;
        this.playAnimation();
    }

    removeListener(): void {
        return ;
    }
}
