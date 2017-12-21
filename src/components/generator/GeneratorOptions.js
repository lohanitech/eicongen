import React from 'react';

class GeneratorOptions extends React.Component{
    state = {
        android: true,
        ios: true,
        web: true,
        watchkit: true
    }

    handleButtonClick = ev => {
        this.props.onGenerate(this.state)
    }
    
    handleCheckChange = ev => {
        this.setState({[ev.target.value]: !this.state[ev.target.value]})
    }

    render(){
        return(
            <div className="generator-options">
                <p>Save to</p>
                <ul>
                    <li>
                        <label>
                            <input type="checkbox" onChange={this.handleCheckChange} value="android" checked={this.state.android} /> Android
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" onChange={this.handleCheckChange} value="ios" checked={this.state.ios} /> iOS
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" onChange={this.handleCheckChange} value="web" checked={this.state.web} /> Web
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox" onChange={this.handleCheckChange} value="watchkit" checked={this.state.watchkit} /> Watchkit
                        </label>
                    </li>
                </ul>
                <button onClick={this.handleButtonClick}>Generate Icons</button>
            </div>
        )
    }
}

export default GeneratorOptions;