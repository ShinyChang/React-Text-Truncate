# React-Truncate-Text [![npm version](https://badge.fury.io/js/react-text-truncate.svg)](https://badge.fury.io/js/react-text-truncate)

## Install

```
npm install react-text-truncate
```

## Usage

```js
import TextTruncate from 'react-text-truncate'; // recommend
var TextTruncate = require('react-text-truncate'); // CommonJS or UMD
```

## Markup

```jsx
<TextTruncate
    line={1}
    element="span"
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
