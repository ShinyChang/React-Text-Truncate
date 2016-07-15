import React, {Component, PropTypes} from 'react';

export default class TextTruncate extends Component {
    static propTypes = {
        containerClassName: PropTypes.string,
        line: PropTypes.number,
        text: PropTypes.string,
        textTruncateChild: PropTypes.node,
        truncateText: PropTypes.string
    };

    static defaultProps = {
        line: 1,
        text: '',
        truncateText: '…'
    };

    constructor(props) {
        super(props);
        this.rafID = null;
        this.displyedText = '';
    }

    componentDidMount() {
        this.update();
        window.addEventListener('resize', this.onResize);
    }

    componentDidUpdate() {
        if (!this.done) {
            this.forceUpdate();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    onResize = () => {
        const requestID = window.requestAnimationFrame(this.update.bind(this));

        if (this.rafID) {
            window.window.cancelAnimationFrame(this.rafID);
            this.rafID = requestID;
        }
    };

    update = () => {
        this.setState({
            scopeRect: this.getRect(this.refs.scope),
            rafID: null
        });
    };

    getRect(element) {
        return element.getBoundingClientRect();
    }

    getStyleInfo(element) {
        const style = window.getComputedStyle(element);
        const data = {
            width: parseInt(style.width, 10),
            height: parseInt(style.height, 10),
            fontSize: parseInt(style.fontSize, 10),
        };

        if (style.lineHeight === 'normal') {
            data.lineHeight = Math.round(data.fontSize * 1.14);
        } else if (style.lineHeight.indexOf('px')) {
            data.lineHeight = parseInt(style.lineHeight, 10);
        } else {
            data.lineHeight = Math.round(data.fontSize * parseFloat(style.lineHeight));
        }

        data.lines = Math.round(data.height / data.lineHeight);

        return data;
    }

    getRenderText = () => {
        const {
            containerClassName,
            line,
            text,
            textTruncateChild,
            truncateText,
            ...props
        } = this.props;

        const {
            scopeRect
        } = this.state;

        // return if display:none
        if (scopeRect.width === 0) {
            return (
                <div {...props} ref='text'></div>
            );
        }

        // return if display all of the text
        const textStyle = this.getStyleInfo(this.refs.text);
        if ((!this.displyedText || this.displyedText === text) && textStyle.lines <= line) {
            this.displyedText = text;
            return (
                <div {...props} ref='text'>{text}</div>
            );
        }
        if (this.displyedText) {
            if (this.height > textStyle.height) {
                this.max = this.displyedText.length;
            } else {
                this.min = this.displyedText.length;
            }
            this.displyedText = this.displyedText + text.substring(this.displyedText.length, (this.min + this.max) / 2);
        } else {
            this.min = Math.floor(text.length / textStyle.lines * line);
            this.max = Math.ceil(text.length / textStyle.lines * (line + 1));
            this.height = textStyle.height;
            this.displyedText = text.substr(0, text.length / textStyle.lines * line);
        }
        this.done = this.max === this.min;
        console.log(this.min, this.max, this.done);

        return (
            <div {...props} ref='text'>
                {this.displyedText}
                {truncateText}
                <span ref='textTruncateChild'>{textTruncateChild}</span>
            </div>
        );
    }

    render() {
        console.log('render');
        const {
            text,
            containerClassName,
        } = this.props;

        let renderText = (
            <div ref='text'>{text}</div>
        );

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
