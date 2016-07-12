import React, {Component} from 'react';

export default class TextTruncate extends Component {
    static propTypes = {
        containerClassName: React.PropTypes.string,
        line: React.PropTypes.number,
        text: React.PropTypes.string,
        textTruncateChild: React.PropTypes.node,
        truncateText: React.PropTypes.string
    };

    static defaultProps = {
        line: 1,
        text: '',
        truncateText: '…'
    };

    componentDidMount() {
        const canvas = document.createElement('canvas');
        const docFragment = document.createDocumentFragment();
        const style = window.getComputedStyle(this.refs.scope);
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
    }

    onResize = () => {
        window.requestAnimationFrame(this.update.bind(this))
    };

    update = () => {
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
            ...props
        } = this.props;

        const scopeWidth = this.refs.scope.getBoundingClientRect().width;

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
            if (['span', 'a'].includes(textTruncateChild.type)) {
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
                    } while (width >= scopeWidth);
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
                text
            );
        }
        return (
            <div {...props}>
                {text.substr(0, startPos) + truncateText + ' '}
                {textTruncateChild}
            </div>
        );

    }

    render() {
        const {
            text,
            containerClassName,
        } = this.props;

        let renderText = text;
        if (this.refs.scope) {
            renderText = this.getRenderText();
        }

        return (
            <div ref='scope' className={containerClassName} style={{overflow: 'hidden'}}>
                {renderText}
            </div>
        );
    }
};
