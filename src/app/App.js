import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import IconSizes from './IconsSizes';
import ImageLoad from '../components/image-load/ImageLoad';
import GeneratorOptions from '../components/generator/GeneratorOptions';

const electron = window.require('electron')
const nativeImage = electron.nativeImage
const fs = electron.remote.require('fs');
const shell = electron.shell;


class App extends Component {
  state = {
    nImage: null
  }  


  handleGenerateIcon = (whichIcons) => {
    if(!this.state.nImage){
      console.error('No image selected');
      return;
    }
    let base = whichIcons.saveTarget;
    if(!fs.existsSync(base)){
      fs.mkdirSync(base);
    }

    if(whichIcons.android){
        let androidDir = base + "/android/"
        this.mkdir(androidDir)
        this.generateAndroidIcons(androidDir)
    }

    if(whichIcons.ios){
      let iosDir = base + "/ios/";
      this.mkdir(iosDir);
      iosDir += "AppIcon.appiconset/"
      this.mkdir(iosDir);
      this.generateIOSIcons(iosDir);
    }
    
    if(whichIcons.web){
      let webDir = base + "/web/"
      this.mkdir(webDir);
      this.generateWebIcons(webDir)
    }

    if(whichIcons.watchkit){
      let watchkitDir = base + '/watchkit/'
      this.mkdir(watchkitDir)
      this.generateWatchKitIcons(watchkitDir);
    }

    shell.openItem(base)
  }

  generateWatchKitIcons = base => {
    IconSizes.watchkit.map(icon =>{
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(base+icon.name, image.toPng())
      return true;
    })
  }

  generateWebIcons = base => {
    IconSizes.web.map(icon =>{
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(base+icon.size+".png", image.toPng())
      return true;
    })

  }

  generateIOSIcons = base => {
    IconSizes.ios.map(icon =>{
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(base+icon.name, image.toPng())
      return true;
    })
  }

  generateAndroidIcons = base => {
    IconSizes.android.map(icon=>{
      let dirname = base+icon.dirname + "/";
      this.mkdir(dirname); 
      let image = this.state.nImage.resize({width: icon.size, height: icon.size});
      fs.writeFileSync(dirname+"ic_launcher.png", image.toPng())
      return true;
    })
  }

  mkdir = path => {
    if(!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
  }

  handleImageLoad = path => {
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
          <GeneratorOptions onGenerate={this.handleGenerateIcon} />
        </div>
      </div>
    );
  }
}

export default App;
