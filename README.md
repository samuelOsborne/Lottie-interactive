# Lottie-interactive
Lottie interactive is custom web element adding multiple types of interactivity to Lottie animations.

## Installation

Lottie-interactive is availabile through npm.

```bash
npm install lottie-interactive
```

## Usage

```javascript
import { lottie-interactive } from 'lottie-interactive'
```

Usage in markup:

```HTML
<lottie-interactive path="button.json" interaction="click"></lottie-interactive>
```

## Examples

```shell
npm i
npm start
```

### Current interactions and available attributes

#### Interactions

##### click
Plays animation when user clicks on animation container
```HTML
<lottie-interactive path="button.json" interaction="click"></lottie-interactive>
```

##### hover
Plays animation when user hovers on animation container
```HTML
<lottie-interactive path="button.json" interaction="hover"></lottie-interactive>
```

##### morph
plays animation when user hovers on animation container, plays in reverse on 'mouseexit' event
```HTML
<lottie-interactive path="button.json" interaction="morph"></lottie-interactive>
```

##### switch
plays animation when user clicks on animation container, plays again in reverse on second click
```HTML
<lottie-interactive path="button.json" interaction="switch"></lottie-interactive>
```

##### play-on-show
Plays animation when container is visible
```HTML
<lottie-interactive path="button.json" interaction="play-on-show"></lottie-interactive>
```

##### play-once
Plays animation once
```HTML
<lottie-interactive path="button.json" interaction="play-once"></lottie-interactive>
```

#### Attributes

The default state for attributes are false.

##### loop
Makes the animation loop
```HTML
<lottie-interactive path="button.json" loop></lottie-interactive>
```

##### autoplay
Makes the animation play automatically on load
```HTML
<lottie-interactive path="button.json" autoplay></lottie-interactive>
```

##### reset
Resets the animation to the first frame after it has finished playing
```HTML
<lottie-interactive path="button.json" reset></lottie-interactive>
```

##### aspect-ratio
Define aspect ratio, default value is 'xMidYMid slice', more information [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)
```HTML
<lottie-interactive path="button.json" aspect-ratio='xMidYMid meet'></lottie-interactive>
```

### Browser compatibilty

Currently this library is usable on modern browsers supporting **Web components** and **Lottie**.


### Upcoming features

- Changeable stroke width attribute
- Changeable stroke color attribute
- More interactions!
