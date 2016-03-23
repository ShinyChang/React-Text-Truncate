function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['module', 'exports', 'react'], function (module, exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var TextTruncate = (function (_Component) {
        _inherits(TextTruncate, _Component);

        function TextTruncate() {
            _classCallCheck(this, TextTruncate);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextTruncate).call(this));

            _this.onResize = _this.onResize.bind(_this);
            return _this;
        }

        _createClass(TextTruncate, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var canvas = document.createElement('canvas');
                var docFragment = document.createDocumentFragment();
                docFragment.appendChild(canvas);
                this.canvas = canvas.getContext('2d');
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var style = window.getComputedStyle(this.refs.scope);
                var font = [];
                font.push(style['font-weight']);
                font.push(style['font-style']);
                font.push(style['font-size']);
                font.push(style['font-family']);
                this.canvas.font = font.join(' ');
                this.forceUpdate();
                window.addEventListener('resize', this.onResize);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                window.removeEventListener('resize', this.onResize);
            }
        }, {
            key: 'onResize',
            value: function onResize() {
                this.forceUpdate();
            }
        }, {
            key: 'measureWidth',
            value: function measureWidth(text) {
                return this.canvas.measureText(text).width;
            }
        }, {
            key: 'getRenderText',
            value: function getRenderText() {
                var textWidth = this.measureWidth(this.props.text);
                var ellipsisWidth = this.measureWidth(this.props.truncateText);
                var scopeWidth = this.refs.scope.offsetWidth;

                if (scopeWidth >= textWidth) {
                    return this.props.text;
                } else {
                    var n = 0;
                    var max = this.props.text.length;
                    var text = '';
                    var splitPos = 0;
                    var startPos = 0;
                    var line = this.props.line;
                    while (line--) {
                        var ext = line ? '' : this.props.truncateText;
                        while (n <= max) {
                            n++;
                            text = this.props.text.substr(startPos, n);
                            if (this.measureWidth(text + ext) > scopeWidth) {
                                splitPos = text.lastIndexOf(' ');
                                if (splitPos === -1) {
                                    splitPos = n - 1;
                                }
                                startPos += splitPos;
                                break;
                            }
                        }
                        if (n >= max) {
                            startPos = max;
                            break;
                        }
                        n = 0;
                    }
                    return startPos === max ? this.props.text : this.props.text.substr(0, startPos - 1) + this.props.truncateText;
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var text = '';
                if (this.refs.scope) {
                    text = this.getRenderText();
                }
                var attrs = {
                    ref: 'scope'
                };
                if (this.props.showTitle) {
                    attrs.title = this.props.text;
                }

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        attrs,
                        text
                    ),
                    this.props.textTruncateChild
                );
            }
        }]);

        return TextTruncate;
    })(_react.Component);

    TextTruncate.propTypes = {
        text: _react2.default.PropTypes.string,
        truncateText: _react2.default.PropTypes.string,
        line: _react2.default.PropTypes.number,
        showTitle: _react2.default.PropTypes.bool,
        textTruncateChild: _react2.default.PropTypes.node
    };
    TextTruncate.defaultProps = {
        text: '',
        truncateText: '…',
        line: 1,
        showTitle: true
    };
    exports.default = TextTruncate;
    ;
    module.exports = exports['default'];
});
