import React from 'react';
import TextTruncate from './TextTruncate';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "商動同的的都養西評興、即起續了起慢不時不見，角熱吸學長為麼西對自的到，治發言心，水頭期！例源以候王們社成！因才合計溫館常農在願是車一快產自毒春這壓明不體話小話產臉道的入大至升沒區坡園甚家令西家就德果特寫外知？為懷的家，基是院：史生在臺作於，下清雜高對當都質特。分再而一到起說陸常下成決養我日天壓票絕？任的洲票對縣著？太法防；生不才專日太運於麼；雜漸以！南突不人快遠費原體地子這重特風人大來看單來白直出親子重年？",
            line: 2,
            truncateText: '...',
            showTitle: true
        };
    }
    handleChange = (e) => {
        this.setState({
            line: React.findDOMNode(this.refs.line).value << 0,
            text: React.findDOMNode(this.refs.text).value,
            truncateText: React.findDOMNode(this.refs.truncateText).value,
            showTitle: React.findDOMNode(this.refs.showTitle).checked,
        });
    }
    render() {
        let props = this.state;
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
                <div className='form-group'>
                    <label>Result</label>
                    <TextTruncate {...props} />
                </div>
            </div>
        )
    }
}
