import React, { Component } from "react";
import TextTruncate from "./TextTruncate";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            line: 2,
            truncateText: "…",
            appendTextTruncateChild: true
        };
    }

    handleChange = e => {
        this.setState({
            line: this.refs.line.value << 0,
            text: this.refs.text.value,
            truncateText: this.refs.truncateText.value,
            appendTextTruncateChild: this.refs.appendTextTruncateChild.checked
        });
    };

    onToggle = e => {
        var display = this.refs.invisibleBlock.style.display;
        this.refs.invisibleBlock.style.display =
            display === "none" ? "block" : "none";
        this.refs.invisibleTextTruncate.update();
    };

    render() {
        const { appendTextTruncateChild, ...props } = this.state;

        if (appendTextTruncateChild) {
            props.textTruncateChild = <a href="#">Read On</a>;
        }
        return (
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <div className="form-group">
                        <label htmlFor="line">Line</label>
                        <input
                            className="form-control"
                            id="line"
                            ref="line"
                            onChange={this.handleChange}
                            type="number"
                            value={this.state.line}
                            min={1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Text</label>
                        <textarea
                            className="form-control"
                            id="text"
                            ref="text"
                            onChange={this.handleChange}
                            rows={5}
                            value={this.state.text}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="truncateText">TruncateText</label>
                        <input
                            className="form-control"
                            id="truncateText"
                            ref="truncateText"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.truncateText}
                        />
                    </div>
                    <div className="checkbox">
                        <label htmlFor="appendTextTruncateChild">
                            <input
                                id="appendTextTruncateChild"
                                ref="appendTextTruncateChild"
                                onChange={this.handleChange}
                                type="checkbox"
                                checked={this.state.appendTextTruncateChild}
                            />
                            Append TextTruncate child
                        </label>
                    </div>
                </div>
                <div className="col-md-6 col-xs-12">
                    <h4>Result</h4>
                    <div id="sample-1">
                        <h5>1. Default</h5>
                        <TextTruncate {...props} />
                    </div>
                    <div id="sample-2">
                        <h5>2. With floating image</h5>
                        <div className="media">
                            <div className="media-left">
                                <img
                                    className="media-object"
                                    src="http://fakeimg.pl/64"
                                    width="64"
                                    height="64"
                                />
                            </div>
                            <div className="media-body">
                                <TextTruncate {...props} />
                            </div>
                        </div>
                    </div>
                    <div id="sample-3">
                        <h5>3. Default hidden</h5>
                        <div ref="invisibleBlock" style={{ display: "none" }}>
                            <TextTruncate
                                ref="invisibleTextTruncate"
                                {...props}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={this.onToggle}
                        >
                            Toggle show/hide
                        </button>
                    </div>
                    <div id="sample-4">
                        <h5>4. Customize class</h5>
                        <TextTruncate
                            {...props}
                            containerClassName="text-danger"
                        />
                    </div>
                    <div id="sample-5">
                        <h5>5. Block-level textTruncateChild</h5>
                        <TextTruncate
                            {...props}
                            textTruncateChild={<div>Block level child</div>}
                        />
                    </div>
                    <div id="sample-6">
                        <h5>
                            6. Long words inside a small container (fixed 3
                            lines and width: 150px)
                        </h5>
                        <div style={{ width: 150, background: "#ccc" }}>
                            <TextTruncate
                                line={3}
                                text="Национал-Большевизм. Сталинская массовая культура и формирование русского национального самосознания (1931-1956)"
                            />
                        </div>
                    </div>
                    <div id="sample-7">
                        <h5>7. Event hook</h5>
                        <TextTruncate
                            {...props}
                            onCalculated={() => console.log("onCalculated")}
                            onTruncated={() => console.log("onTruncated")}
                        />
                    </div>
                    <div id="sample-8">
                        <h5>
                            8. Large concurrent text (fixed 3 lines and width:
                            200px){" "}
                            <a href="https://github.com/ShinyChang/React-Text-Truncate/issues/53">
                                #53
                            </a>
                        </h5>
                        <div style={{ width: 200, background: "#ccc" }}>
                            <TextTruncate
                                line={3}
                                text="LoremIpsumissimplydummytextoftheprintingand typesettingindustry.fuhefjfvfjfkvjkvhjkjkvhjjhdfvjfhvjvj hfvjvfhjjhfjsfhjf ghj"
                            />
                        </div>
                    </div>
                    <div id="sample-9">
                        <h5>9. Non-spaced language (fixed width: 200px)</h5>
                        <div style={{ width: 200, background: "#ccc" }}>
                            <TextTruncate
                                {...props}
                                text="中文測試中文測試中文測試中文測試中文測試中文測試中文測試中文測試中文測試中文測試中文測試中文測試"
                            />
                        </div>
                    </div>
                    <div id="sample-10">
                        <h5>10. Custom text element</h5>
                        <TextTruncate
                            {...props}
                            textElement={customTextRender}
                        />
                    </div>
                    <div id="sample-11">
                        <h5>11. Bold text</h5>
                        <div style={{ fontWeight: "bold" }}>
                            <TextTruncate {...props} />
                        </div>
                    </div>
                    <div id="sample-12">
                        <h5>
                            12. Issue{" "}
                            <a href="https://github.com/ShinyChang/React-Text-Truncate/issues/75">
                                #75
                            </a>
                        </h5>
                        <div className="container">
                            <TextTruncate
                                line={1}
                                truncateText="…"
                                text={
                                    "rH2ivGxNu5UX73rt76nLiCjtvwrtg4Tx8orH2ivGxNu5UX73rt76nLiCjtvwrtg4Tx8o"
                                }
                                ref="idRef"
                                containerClassName="address"
                            />
                        </div>
                    </div>
                    <div id="sample-13">
                        <h5>
                            13. Issue{" "}
                            <a href="https://github.com/ShinyChang/React-Text-Truncate/issues/69">
                                #69
                            </a>
                        </h5>
                        <div className="container">
                            <TextTruncate
                                line={1}
                                truncateText="...trancated"
                                text={"V3"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const customTextRender = ({ children }) => {
    return (
        <div>
            {children
                .split("")
                .reverse()
                .join("")}
        </div>
    );
};
