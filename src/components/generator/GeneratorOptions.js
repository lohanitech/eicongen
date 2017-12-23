import React from 'react';
import './styles.css'
import Checkbox from '../checkbox/Checkbox';

const electron = window.require('electron')
const path = window.require('path');
const ipcRenderer = electron.ipcRenderer;

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
                        <Checkbox id="android" label="Android" checked={this.state.android} onChange={this.handleCheckChange} value="android" />
                    </li>
                    <li>
                        <Checkbox id="ios" label="iOS" checked={this.state.ios} onChange={this.handleCheckChange} value="ios" />
                    </li>
                    <li>
                        <Checkbox id="web" label="Web" checked={this.state.web} onChange={this.handleCheckChange} value="web" />
                    </li>
                    <li>
                        <Checkbox id="watchkit" label="Watchkit" checked={this.state.watchkit} onChange={this.handleCheckChange} value="watchkit" />
                    </li>
                </ul>
                <button onClick={this.handleButtonClick}>Generate Icons</button>
            </div>
        )
    }
}

export default GeneratorOptions;