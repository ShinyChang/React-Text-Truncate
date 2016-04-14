import React, {Component} from 'react';

export default class TextTruncate extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        truncateText: React.PropTypes.string,
        line: React.PropTypes.number,
        showTitle: React.PropTypes.bool,
        textTruncateChild: React.PropTypes.node,
        raf: React.PropTypes.bool
    };

    static defaultProps = {
        text: '',
        truncateText: '…',
        line: 1,
        showTitle: true,
        raf: true
    };

    componentDidMount() {
        let canvas = document.createElement('canvas');
        let docFragment = document.createDocumentFragment();
        let style = window.getComputedStyle(this.refs.scope);
        let font = [
            style['font-weight'],
            style['font-style'],
            style['font-size'],
            style['font-family']
        ].join(' ');
        docFragment.appendChild(canvas);
        this.canvas = canvas.getContext('2d');
        this.canvas.font = font;
        this.forceUpdate();

        if (this.props.raf) {
          this.loopId = window.requestAnimationFrame(this.animationStep);
        } else {
          window.addEventListener('resize', this.onResize);
        }
    }

    componentWillUnmount() {
        if (this.props.raf) {
            window.cancelAnimationFrame(this.loopId);
        } else {
            window.removeEventListener('resize', this.onResize);
        }
    }

    animationStep = (timeStamp) => {
        if ((timeStamp - this.lastTime) < 150) {
            this.loopId = window.requestAnimationFrame(this.animationStep);
            return;
        }

        this.lastTime = timeStamp;
        this.onResize();
        this.loopId = window.requestAnimationFrame(this.animationStep);
    };

    onResize = () => {
        this.forceUpdate();
    };

    measureWidth(text) {
        return this.canvas.measureText(text).width;
    }

    getRenderText() {
        let textWidth = this.measureWidth(this.props.text);
        let scopeWidth = this.refs.scope.getBoundingClientRect().width;
        if (scopeWidth >= textWidth) {
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
        let text = '';
        if (this.refs.scope) {
            text = this.getRenderText();
        }

        let attrs = {};
        if (this.props.showTitle) {
            attrs.title = this.props.text;
        }

        return (
            <div ref='scope' style={{overflow: 'hidden'}}>
                <div {...attrs}>{text}</div>
                {this.props.text === text ? null : this.props.textTruncateChild}
            </div>
        );
    }
};
