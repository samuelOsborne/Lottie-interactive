import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class Hover extends BaseInteraction {
    private readonly hoverHandler: any;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.Hover;
        this.hoverHandler = this.playAnimation.bind(this);
        this.initListener();
    }

    private initListener(): void {
        this.animationContainer.addEventListener('mouseenter', this.hoverHandler);
    }

    public removeListener(): void {
        console.log("removing hover listener")
        this.animationContainer.removeEventListener('mouseenter', this.hoverHandler);
    }
}
