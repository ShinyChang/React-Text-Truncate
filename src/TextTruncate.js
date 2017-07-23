import React, {Component, createElement} from 'react';
import PropTypes from 'prop-types';

export default class TextTruncate extends Component {
  static propTypes = {
    containerClassName: PropTypes.string,
    element: PropTypes.string,
    line: PropTypes.number,
    onCalculated: PropTypes.func,
    onTruncated: PropTypes.func,
    text: PropTypes.string,
    textElement: PropTypes.node,
    textTruncateChild: PropTypes.node,
    truncateText: PropTypes.string
  };

  static defaultProps = {
    element: 'div',
    line: 1,
    text: '',
    textElement: 'div',
    truncateText: '…'
  };

  componentDidMount() {
    const canvas = document.createElement('canvas');
    const docFragment = document.createDocumentFragment();
    const style = window.getComputedStyle(this.scope);
    const font = [
      style['font-weight'],
      style['font-style'],
      style['font-size'],
      style['font-family']
    ].join(' ');

    docFragment.appendChild(canvas);
    this.canvas = canvas.getContext('2d');
    this.canvas.font = font;
    this.forceUpdate();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    if (this.rafId) {
     window.cancelAnimationFrame(this.rafId);
    }
  }

  onResize = () => {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
    this.rafId = window.requestAnimationFrame(this.update.bind(this))
  };

  onTruncated = () => {
    typeof this.props.onTruncated === 'function' && setTimeout(() => this.props.onTruncated(), 0);
  };

  onCalculated = () => {
    typeof this.props.onCalculated === 'function' && setTimeout(() => this.props.onCalculated(), 0);
  };

  update = () => {
    const style = window.getComputedStyle(this.scope);
    const font = [
      style['font-weight'],
      style['font-style'],
      style['font-size'],
      style['font-family']
    ].join(' ');
    this.canvas.font = font;
    this.forceUpdate();
  };

  measureWidth(text) {
    return this.canvas.measureText(text).width;
  }

  getRenderText() {
    const {
      containerClassName,
      element,
      line,
      onCalculated,
      onTruncated,
      text,
      textElement,
      textTruncateChild,
      truncateText,
      ...props
    } = this.props;

    const scopeWidth = this.scope.getBoundingClientRect().width;

    // return if display:none
    if (scopeWidth === 0) {
      return null;
    }

    // return if all of text can be displayed
    if (scopeWidth >= this.measureWidth(text)) {
      return createElement(textElement, props, text);
    }

    let childText = '';
    if (textTruncateChild && typeof textTruncateChild.type === 'string') {
      let type = textTruncateChild.type;
      if (type.indexOf('span') >= 0 || type.indexOf('a') >= 0) {
        childText = textTruncateChild.props.children;
      }
    }

    let currentPos = 1;
    let maxTextLength = text.length;
    let truncatedText = '';
    let splitPos = 0;
    let startPos = 0;
    let displayLine = line;
    let width = 0;
    let lastIsEng = false;
    let isPrevLineWithoutSpace = false;
    let lastPos = 0;
    let lastSpaceIndex = -1;
    
    while (displayLine-- > 0) {
      let ext = displayLine ? '' : truncateText + ' ' + childText;
      while (currentPos <= maxTextLength) {
        truncatedText = text.substr(startPos, currentPos);
        width = this.measureWidth(truncatedText + ext);
        if (width < scopeWidth) {
          splitPos = text.indexOf(' ', currentPos + 1);
          if (splitPos === -1) {
            currentPos += 1;
            lastIsEng = false;
          } else {
            lastIsEng = true;
            currentPos = splitPos;
          }
        } else {
          do  {
            currentPos--;
            truncatedText = text.substr(startPos, currentPos);
            if (truncatedText[truncatedText.length - 1] === ' ') {
              truncatedText = text.substr(startPos, currentPos - 1);
            }
            if (lastIsEng) {
              lastSpaceIndex = truncatedText.lastIndexOf(' ');
              if (lastSpaceIndex > -1) {
                currentPos = lastSpaceIndex - 1;
                truncatedText = text.substr(startPos, currentPos);
              }
            }
            width = this.measureWidth(truncatedText + ext);
          } while (width >= scopeWidth && truncatedText.length > 0);
          startPos += currentPos;
          break;
        }
      }

      if (currentPos >= maxTextLength) {
        startPos = maxTextLength;
        break;
      }

      if (lastIsEng && !isPrevLineWithoutSpace && text.substr(lastPos, currentPos).indexOf(' ') === -1) {
        isPrevLineWithoutSpace = text.substr(lastPos, currentPos).indexOf(' ') === -1;
        displayLine--;
      }
      lastPos = currentPos + 1;
    }

    if (startPos === maxTextLength) {
      return createElement(textElement, props, text);
    }
    
    this.onTruncated();
    return (
      <div {...props}>
        {createElement(textElement, props, text.substr(0, startPos) + truncateText + ' ')}
        {textTruncateChild}
      </div>
    );
  }

  render() {
    const {
      element,
      text,
      style = {},
      containerClassName,
      line,
      onCalculated,
      onTruncated,
      textElement,
      textTruncateChild,
      truncateText,
      ...props
    } = this.props;

    const { fontWeight, fontStyle, fontSize, fontFamily } = style;

    const renderText = this.scope ? this.getRenderText() : createElement(textElement, props, text);;
    const rootProps = {
      ref: (el) => {this.scope = el},
      className: containerClassName,
      style: {overflow: 'hidden', fontWeight, fontStyle, fontSize, fontFamily}
    };

    this.scope && this.onCalculated();
    return createElement(element, rootProps, renderText);
  }
};
