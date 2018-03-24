# React-Truncate-Text [![npm version](https://badge.fury.io/js/react-text-truncate.svg)](https://badge.fury.io/js/react-text-truncate)

## Install

```
npm install react-text-truncate
```

## Usage

```
import TextTruncate from 'react-text-truncate'; // recommend
var TextTruncate = require('react-text-truncate'); // CommonJS or UMD
```

## Markup

```
<TextTruncate
    line={1}
    truncateText="…"
    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    textTruncateChild={<a href="#">Read on</a>}
/>
```

[Demo](http://shinychang.github.io/React-Text-Truncate/)

## FAQ

1. Why TextTruncate not shown after display changed?

    You must trigger update manually.

2. Will TextTruncate support IE10 or below?

    No! IE 10 and below are dead according to [Microsoft post](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support).

3. Uncaught ReferenceError: requestAnimationFrame is not defined

    Please polyfill `requestAnimationFrame` before you called `<TextTruncated />`

## Changelog

* 0.13.1 Fix react warning of `maxCalculateTimes`
* 0.13.0 Shows all of the text when `line` is falsely, add `maxCalculateTimes` to prevent infinite loop
* 0.12.1 Update peerDependencies to support React 16
* 0.12.0 Added new prop: `textElement` for customize text render
* 0.11.2 Fix truncate incorrect in small size of width
* 0.11.0 Added two event hooks: `onTruncated` and `onCalculated`
* 0.10.4 Support inline style
* 0.10.3 Downgrade peerDependencies to `^15.4.1`
* 0.10.2 Fix truncated wrong when font property changed
* 0.10.1 Fix unknown prop `element`
* 0.10.0 Allow pass `element` to specify root element type
* 0.9.3 Fix SSR window not found (removed raf polyfill)
* 0.9.2 Fix styles prop is not working when the text is not truncated
* 0.9.1 Fix async this.forceUpdate() issue
* 0.9.0 Fix infinity loop bug, upgrade react to 15.5.4 and support yarn
* 0.8.3 IE 11 compatibility
* 0.8.2 Fix wrong truncating when a container has long words without spaces
* 0.8.1 Fix `textTruncateChild` bug
* 0.8.0 Drop `showTitle`, put `textTruncateChild` in same line if `tagName` is `A` or `SPAN`
* 0.7.2 Server render will display all text
* 0.7.1 Add new prop `containerClassName`
* 0.7.0 Fix infinite update bug, drop raf
* 0.6.2 Fix infinite loop bug
* 0.6.1 Fix lib issue for browser
* 0.6.0 Support React 15
* 0.5.2 Fix server render bug
* 0.5.1 Hide `textTruncateChild` when nothing truncated
* 0.5.0 Add request animation frame
* 0.4.0 New property `textTruncateChild` for show more or others
* 0.3.7 Support CommonJS and UMD module loader
* 0.3.5 Fix window resize issue
* 0.3.4 supports Babel6
* 0.2.0 supports React 0.14
* 0.1.5 supports React 0.13.3 and below
