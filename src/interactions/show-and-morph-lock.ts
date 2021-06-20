import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";
import {PlayOnShow} from "./play-on-show";
import {MorphLock} from "./morph-lock";

export class ShowAndMorphLock extends BaseInteraction {
    private playOnShow: PlayOnShow;
    private playOnMorphLock: MorphLock;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.ShowAndClick;
        this.playOnShow = new PlayOnShow(player, element, fastElement);
        this.playOnMorphLock = new MorphLock(player, element, fastElement);
    }

    removeListener(): void {
    }
}
