import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";
import {FASTElement} from "@microsoft/fast-element";
import {PlayOnShow} from "./play-on-show";
import {Switch} from "./switch";

export class ShowAndSwitch extends BaseInteraction {
    private playOnShow: PlayOnShow;
    private playOnSwitch: Switch;

    constructor(player: LottiePlayer, element: HTMLElement, fastElement: FASTElement) {
        super(player, element, fastElement);

        this.interactionType = InteractionType.ShowAndClick;
        this.playOnShow = new PlayOnShow(player, element, fastElement);
        this.playOnSwitch = new Switch(player, element, fastElement);
    }

    removeListener(): void {
    }
}
