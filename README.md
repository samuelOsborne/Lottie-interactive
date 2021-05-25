![alt Lottie-interactive](https://github.com/samuelOsborne/Lottie-interactive/blob/master/assets/lottie-interactive.png?raw=true)

Lottie interactive is custom web element adding multiple types of interactivity to Lottie animations.

## Installation

Lottie-interactive is availabile through npm.

```bash
npm install lottie-interactive
```

Lottie-interactive is also available though unpkg.
```HTML
<script type="text/javascript" src="https://unpkg.com/lottie-interactive@latest/dist/lottie-interactive.js"></script>
```


## Usage
From javascript module:
```javascript
import { LottieInteractive } from 'lottie-interactive'
```

Usage in markup:

```HTML
<lottie-interactive path="button.json" interaction="click"></lottie-interactive>
```

## _Nuxt.js_

- ```npm -i lottie-interactive```
- Create a plugin for lottie-interactive in ```/plugins/lottie-interactive.client.js```:
```javascript
import Vue from 'vue'
import LottieInteractive from 'lottie-interactive'

Vue.use(LottieInteractive)
```
You can then use lottie-interactive inside of your templates:
```html
<template>
    <lottie-interactive
      path="/animations/svgenius-logo.json"
      autoplay
      loop
      view-box="0 0 500 300"
    />
</template>
```

Remarks: Animation files (.json) can be accessed if put inside the ```/static``` directory. URLs to the animation
can also be used.

## _Next.js_

- ```npm -i lottie-interactive```

Then inside of your pages:
```Javascript
import React from "react";

export default function Home() {
  React.useEffect(() => {
    import("lottie-interactive/dist/lottie-interactive.js");
  });

  return (
    <div>
          <lottie-interactive
              path="/animations/svgenius-logo.json"
              autoplay
              loop
          />
    </div>
  );
}
```

Remarks: Animation files (.json) can be accessed if put inside the ```/public/``` directory. URLs to the animation
can also be used.
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

##### freeze click
Freezes animation when user clicks on animation container
```HTML
<lottie-interactive path="button.json" interaction="freeze-click" autoplay loop></lottie-interactive>
```

##### hover
Plays animation when user hovers on animation container
```HTML
<lottie-interactive path="button.json" interaction="hover"></lottie-interactive>
```

##### morph
Plays animation when user hovers on animation container, plays in reverse on 'mouseexit' event
```HTML
<lottie-interactive path="button.json" interaction="morph"></lottie-interactive>
```

##### morph-lock
Plays animation when user hovers on animation container. Locks animation at the end if user clicks. Plays in reverse on 'mouseexit' event.
```HTML
<lottie-interactive path="button.json" interaction="morph-lock"></lottie-interactive>
```

##### switch
Plays animation when user clicks on animation container, plays again in reverse on second click
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

The default state for attributes are false or null for stroke width and color.

##### loop
Makes the animation loop
```HTML
<lottie-interactive path="button.json" loop></lottie-interactive>
```

##### s-width
Changes the stroke width of every stroke
```HTML
<lottie-interactive path="button.json" s-width="25"></lottie-interactive>
```

##### s-color
Changes the stroke color of every stroke, must be a full hexadecimal color
```HTML
<lottie-interactive path="button.json" s-color="#ffffff"></lottie-interactive>
```

##### autoplay
Makes the animation play automatically on load
```HTML
<lottie-interactive path="button.json" autoplay></lottie-interactive>
```

##### speed
Sets the speed of the animation
```HTML
<lottie-interactive path="button.json" speed="0.5"></lottie-interactive>
```

##### delay
Delay the loading of the animation, defined in milliseconds
```HTML
<lottie-interactive path="button.json" delay="3000"></lottie-interactive>
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

### Usage notice

#### Browser compatibility

Currently this library is usable on modern browsers supporting **Web components** and **Lottie**.


#### Bundlers

We recommend using this library with a module bundler such as **webpack**.

### Upcoming features

- Color on hover
- Animation zooming
- Padding modifier
- Upgrade codebase to use Microsoft FAST

### Youtube guides

https://www.youtube.com/channel/UCPPNxV39UlVo3emNQSNNTug

### Lottie animations

https://svgenius.co

https://lottiefiles.com/svgenius


