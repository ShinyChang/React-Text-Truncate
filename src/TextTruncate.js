import React, {Component} from 'react';

export default class TextTruncate extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        truncateText: React.PropTypes.string,
        line: React.PropTypes.number,
        showTitle: React.PropTypes.bool,
        textTruncateChild: React.PropTypes.node,
        containerClassName: React.PropTypes.string
    };

    static defaultProps = {
        text: '',
        truncateText: '…',
        line: 1,
        showTitle: true
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
        let textWidth = this.measureWidth(this.props.text);
        let scopeWidth = this.refs.scope.getBoundingClientRect().width;
        if (scopeWidth === 0) {
            return '';
        } else if (scopeWidth >= textWidth) {
            return this.props.text;
        } else {
            let currentPos = 1;
            let maxTextLength = this.props.text.length;
            let text = '';
            let splitPos = 0;
            let startPos = 0;
            let line = this.props.line;
            let width = 0;
            let lastIsEng = false;
            while(line--) {
                let ext = line ? '' : this.props.truncateText;
                while (currentPos <= maxTextLength) {
                    text = this.props.text.substr(startPos, currentPos);
                    width = this.measureWidth(text + ext);
                    if (width < scopeWidth) {
                        splitPos = this.props.text.indexOf(' ', currentPos + 1);
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
                            text = this.props.text.substr(startPos, currentPos);
                            if (text[text.length - 1] === ' ') {
                                text = this.props.text.substr(startPos, currentPos - 1);
                            }
                            if (lastIsEng) {
                                currentPos = text.lastIndexOf(' ');
                                text = this.props.text.substr(startPos, currentPos);
                            }
                            width = this.measureWidth(text + ext);
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

            return startPos === maxTextLength
                        ? this.props.text
                        : this.props.text.substr(0, startPos) + this.props.truncateText;
        }
    }

    render() {
        const {
            text,
            truncateText,
            line,
            showTitle,
            textTruncateChild,
            containerClassName,
            ...props
        } = this.props;

        let renderText = '';
        if (this.refs.scope) {
            renderText = this.getRenderText();
        }

        if (showTitle && !props.title) {
            props.title = text;
        }

        return (
            <div ref='scope' className={containerClassName} style={{overflow: 'hidden'}}>
                <div {...props}>{renderText}</div>
                {text === renderText ? null : textTruncateChild}
            </div>
        );
    }
};
