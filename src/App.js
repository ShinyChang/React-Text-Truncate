import React, {Component} from 'react';
import TextTruncate from './TextTruncate';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            line: 2,
            truncateText: '…',
            showTitle: true,
            textTruncateChild: <a className='pull-right' onClick={this.showAll}>show more</a>,
            showAll: false,
            raf: true
        };
    }

    handleChange = (e) => {
        this.setState({
            line: this.refs.line.value << 0,
            text: this.refs.text.value,
            truncateText: this.refs.truncateText.value,
            showTitle: this.refs.showTitle.checked
        });
    };

    showAll = () => {
        this.setState({
            showAll: true
        });
    };

    noShowAll = () => {
        this.setState({
            showAll: false
        });
    }

    render() {
        const {showAll, ...props} = this.state;
        let text;
        if (showAll) {
            text = (
                <div>
                    {props.text}
                    <a className='pull-right' onClick={this.noShowAll}>Hide</a>
                </div>
            );
        } else {
            text = <TextTruncate {...props}/>
        }
        return (
            <div>
                <div className='form-group'>
                    <label htmlFor='line'>Line</label>
                    <input className='form-control' id='line' ref='line' onChange={this.handleChange} type='number' value={this.state.line} min={1} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Text</label>
                    <textarea className='form-control' id='text' ref='text' onChange={this.handleChange} rows={10} value={this.state.text}></textarea>
                </div>
                <div className='form-group'>
                    <label htmlFor='truncateText'>TruncateText</label>
                    <input className='form-control' id='truncateText' ref='truncateText' onChange={this.handleChange} type='text' value={this.state.truncateText}/>
                </div>
                <div className='checkbox'>
                    <label htmlFor='showTitle'>
                        <input id='showTitle' ref='showTitle' onChange={this.handleChange} type='checkbox' checked={this.state.showTitle}/>Show Title
                    </label>
                </div>
                <div className='form-group sample'>
                    <label>Result</label>
                    {text}
                </div>
            </div>
        )
    }
}
