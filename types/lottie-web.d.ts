declare namespace Lottie {
    export interface LottiePlayer {
        play(): void;

        stop(): void;

        pause(): void;

        isLoaded: boolean;

        isPaused: boolean;
        /**
         * One param speed (1 is normal speed.
         */
        setSpeed(speed: number): void;
        /**
         * One param direction (1 is normal direction.
         */
        setDirection(direction: number): void;
        /**
         * If false, it will respect the original AE fps. If true, it will update as much as possible. (true by default.
         */
        setSubframe(flag: boolean): void;
        /**
         * First param is a numeric value. second param is a boolean that defines time or frames for first para.
         */
        goToAndPlay(value: number, isFrame: boolean): void;
        /**
         * First param is a numeric value. second param is a boolean that defines time or frames for first para.
         */
        goToAndStop(value: number, isFrame: boolean): void;
        /**
         * First param is a single array or multiple arrays of two values each(fromFrame,toFrame), second param is a boolean for forcing the new segment right awa.
         */
        playSegments(segments: number[] | number[][], forceFlag?: boolean): void;
        /**
         * To destroy and release resources.
         */
        destroy(): void;

        addEventListener(eventName: string, callback: () => void): void;

        removeEventListener(eventName: string, callback: () => void): void;

        /**
         *  Freezes all playing animations or animations that will be loaded
         */
        freeze(): void;
        /**
         *  Unfreezes all animations
         */
        unfreeze(): void;
    }

    export interface LottieOptions {
        /**
         * Animation name for future reference
         */
        name?: string;
        /**
         * The dom element on which to render the animation
         */
        container?: Element;
        /**
         * Defines if the animation should play only once or repeatedly in an endless loop
         */
        loop?: boolean;
        /**
         * Defines if the animation should immediately play when the component enters the DOM
         */
        autoplay?: boolean;
        /**
         * The relative path to the animation object. (animationData and path are mutually exclusive)
         */
        path?: string;
        /**
         * The JSON data exported from Adobe After Effects using the Bodymovin plugin
         */
        animationData?: JSON;
        /**
         * Set the renderer method
         */
        renderer?: 'svg' | 'canvas' | 'html';
        /**
         * Settings for existing canvas
         */
        rendererSettings?: {
            preserveAspectRatio?: string;
            /**
             * The canvas context
             */
            context?: CanvasCompositing;
            clearCanvas?: boolean;
            /**
             * Loads DOM elements when needed. Might speed up initialization for large number of elements. Only with SVG renderer.
             */
            progressiveLoad?: boolean;
            /**
             * Hides elements when opacity reaches 0. Only with SVG renderer.
             * @default true
             */
            hideOnTransparent?: boolean;
            className?: string;
            /**
             *
             */
            viewBoxSize?: string,
            /**
             *
             */
            viewBoxOnly?: boolean,
        };
    }

    /**
     * Returns an animation instance to control individually.
     */
    function loadAnimation(options: LottieOptions): LottiePlayer;
    /**
     * Optional parameter name to target a specific animation
     */
    function play(name?: string): void;
    /**
     * Optional parameter name to target a specific animation
     */
    function stop(name?: string): void;
    /**
     * First param speed (1 is normal speed) with 1 optional parameter name to target a specific animation
     */
    function setSpeed(speed: number, name?: string): void;
    /**
     * First param direction (1 is normal direction.) with 1 optional parameter name to target a specific animation
     */
    function setDirection(direction: number, name?: string): void;
    /**
     * Default 'high', set 'high','medium','low', or a number > 1 to improve player performance. In some animations as low as 2 won't show any difference.
     */
    function setQuality(quality: string | number): void;
    /**
     * Param usually pass as location.href. Its useful when you experience mask issue in safari where your url does not have # symbol.
     */
    function setLocationHref(href: string): void;
    /**
     * You can register an element directly with registerAnimation. It must have the "data-animation-path" attribute pointing at the data.json url
     */
    function registerAnimation(element: HTMLElement, animationData?: JSON): void;
    /**
     * Looks for elements with class "lottie"
     */
    function searchAnimations(animationData?: JSON, standalone?: boolean, renderer?: string): void;
    /**
     * To destroy and release resources. The DOM element will be emptied.
     */
    function destroy(name?: string): void;
}

declare module "Lottie-web" {
    export = Lottie;
}
