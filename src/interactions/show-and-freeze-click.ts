import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";
import {PlayOnShow} from "./play-on-show";
import {FreezeClick} from "./freeze-click";

export class ShowAndFreezeClick extends BaseInteraction {
    private playOnShow: PlayOnShow;
    private playOnFreezeClick: FreezeClick;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.ShowAndClick;
        this.playOnShow = new PlayOnShow(player, element, fastElement);
        this.playOnFreezeClick = new FreezeClick(player, element, fastElement);
    }

    removeListener(): void {
    }
}
