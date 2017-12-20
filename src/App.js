import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  state = {
    image: logo
  }
  
  componentWillMount() {
    ipcRenderer.on('file-opened',(event,args)=>{
      this.setState({
        image: args
      })
    })
  }
  

  handleButtonClick = () => {
    ipcRenderer.send('open-file')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.image} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleButtonClick}>Open file</button>
      </div>
    );
  }
}

export default App;
