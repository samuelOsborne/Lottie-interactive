import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";
import {PlayOnShow} from "./play-on-show";
import {Morph} from "./morph";

export class ShowAndMorph extends BaseInteraction {
    private playOnShow: PlayOnShow;
    private playOnMorph: Morph;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.ShowAndMorph;
        this.playOnShow = new PlayOnShow(player, element, fastElement);
        this.playOnMorph = new Morph(player, element, fastElement);
    }

    removeListener(): void {
    }
}
