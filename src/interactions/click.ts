import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";

export class Click extends BaseInteraction {
    private readonly clickHandler: any;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.Click;
        this.clickHandler = this.playAnimation.bind(this);
        this.initListener();
    }

    private initListener(): void {
        this.animationContainer.addEventListener('click', this.clickHandler);
    }

    public removeListener(): void {
        this.animationContainer.removeEventListener('click', this.clickHandler);
    }
}
