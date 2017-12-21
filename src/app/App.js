import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import IconSizes from './IconsSizes';
import ImageLoad from '../components/image-load/ImageLoad';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer;
const nativeImage = electron.nativeImage
const fs = electron.remote.require('fs');


class App extends Component {
  state = {
    nImage: null
  }  


  handleGenerateIcon = () => {
    // ipcRenderer.send('generate-icons')
    let base = "./generated-icons/";
    if(!fs.existsSync(base)){
      fs.mkdirSync(base);
    }
    let androidDir = base + "android/"
    this.mkdir(androidDir)
    this.generateAndroidIcons(androidDir)
    
    let iosDir = base + "ios/";
    this.mkdir(iosDir);
    iosDir += "AppIcon.appiconset/"
    this.mkdir(iosDir);
    this.generateIOSIcons(iosDir);

    let webDir = base + "web/"
    this.mkdir(webDir);
    this.generateWebIcons(webDir)

    let watchkitDir = base + 'watchkit/'
    this.mkdir(watchkitDir)
    this.generateWatchKitIcons(watchkitDir);
  }

  generateWatchKitIcons = base => {
    IconSizes.watchkit.map(icon =>{
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(base+icon.name, image.toPng())
    })
  }

  generateWebIcons = base => {
    IconSizes.web.map(icon =>{
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(base+icon.size+".png", image.toPng())
    })

  }

  generateIOSIcons = base => {
    IconSizes.ios.map(icon =>{
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(base+icon.name, image.toPng())
    })
  }

  generateAndroidIcons = base => {
    IconSizes.android.map(icon=>{
      let dirname = base+icon.dirname + "/";
      this.mkdir(dirname); 
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(dirname+"ic_launcher.png", image.toPng())
    })
  }

  mkdir = path => {
    if(!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
  }

  handleImageLoad = path => {
    console.log(path)
    let image = nativeImage.createFromPath(path);
    this.setState({
      nImage: image 
    })
  }

  render() {
    return (
      <div className="App">
        <div className="left">
          <ImageLoad onLoadImage = {this.handleImageLoad} />
        </div>
        <div className="right">
          <p>Save to</p>
          <ul>
            <li>Android</li>
            <li>iOS</li>
            <li>Web</li>
            <li>WatchKit</li>
          </ul>
          <button onClick={this.handleGenerateIcon}>Generate Icons</button>
        </div>
      </div>
    );
  }
}

export default App;
