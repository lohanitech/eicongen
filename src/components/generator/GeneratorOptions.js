import React from 'react';

const electron = window.require('electron')
const path = window.require('path');
const ipcRenderer = electron.ipcRenderer;
const nativeImage = electron.nativeImage
const fs = electron.remote.require('fs');

class GeneratorOptions extends React.Component{
    state = {
        android: true,
        ios: true,
        web: true,
        watchkit: true,
        saveTarget: path.resolve(path.join('./','icons'))
    }

    componentWillMount() {
        ipcRenderer.on('target-folder-opened',(event,args)=>{
            this.setState({saveTarget: path.join(args,'icons')})
        })
    }

    handleButtonClick = ev => {
        this.props.onGenerate(this.state)
    }
    
    handleCheckChange = ev => {
        this.setState({[ev.target.value]: !this.state[ev.target.value]})
    }

    selectTargetFolder = ev => {
        ipcRenderer.send('select-target-folder',path.resolve('./'));
    }

    render(){
        return(
            <div className="generator-options">
                <p>
                    Save to <br />
                    {this.state.saveTarget} <br />
                    <button onClick={this.selectTargetFolder}>Change</button>
                </p>


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