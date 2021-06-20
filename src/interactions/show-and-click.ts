import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";
import {PlayOnShow} from "./play-on-show";
import {Click} from "./click";

export class ShowAndClick extends BaseInteraction {
    private playOnShow: PlayOnShow;
    private playOnClick: Click;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.ShowAndClick;
        this.playOnShow = new PlayOnShow(player, element, fastElement);
        this.playOnClick = new Click(player, element, fastElement);
    }

    removeListener(): void {
    }
}
