import React, {Component, createElement} from 'react';
import PropTypes from 'prop-types';

export default class TextTruncate extends Component {
  static propTypes = {
    containerClassName: PropTypes.string,
    element: PropTypes.string,
    line: PropTypes.number,
    text: PropTypes.string,
    textTruncateChild: PropTypes.node,
    truncateText: PropTypes.string,
    onTruncated: PropTypes.func,
    onCalculated: PropTypes.func
  };

  static defaultProps = {
    element: 'div',
    line: 1,
    text: '',
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
      line,
      text,
      textTruncateChild,
      truncateText,
      element,
      ...props
    } = this.props;

    const scopeWidth = this.scope.getBoundingClientRect().width;

    // return if display:none
    if (scopeWidth === 0) {
      return null;
    }

    // return if all of text can be displayed
    if (scopeWidth >= this.measureWidth(text)) {
      return (
        <div {...props}>{text}</div>
      );
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
    let lastSpaceIndex = -1;

    while (displayLine--) {
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
                currentPos = lastSpaceIndex;
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
    }

    if (startPos === maxTextLength) {
      return (
        <div {...props}>{text}</div>
      );
    }
    
    this.onTruncated();
    return (
      <div {...props}>
        {text.substr(0, startPos) + truncateText + ' '}
        {textTruncateChild}
      </div>
    );
  }

  render() {
    const {
      element,
      text,
      containerClassName,
      style = {}
    } = this.props;

    const { fontWeight, fontStyle, fontSize, fontFamily } = style;

    const renderText = this.scope ? this.getRenderText() : text;
    const rootProps = {
      ref: (el) => {this.scope = el},
      className: containerClassName,
      style: {overflow: 'hidden', fontWeight, fontStyle, fontSize, fontFamily}
    };

    this.scope && this.onCalculated();
    return createElement(element, rootProps, renderText);
  }
};
