import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";
import {PlayOnShow} from "./play-on-show";
import {Hover} from "./hover";

export class ShowAndHover extends BaseInteraction {
    private playOnShow: PlayOnShow;
    private playOnHover: Hover;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.ShowAndClick;
        this.playOnShow = new PlayOnShow(player, element, fastElement);
        this.playOnHover = new Hover(player, element, fastElement);
    }

    removeListener(): void {
    }
}
