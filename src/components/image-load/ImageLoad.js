import React from 'react';
import logo from './logo.svg';
import './styles.css';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer;
const nativeImage = electron.nativeImage
const fs = electron.remote.require('fs');

class ImageLoad extends React.Component{
    state = {
        image: logo
    }

    componentWillMount() {
        ipcRenderer.on('file-opened',(event,args)=>{
            this.props.onLoadImage(args)
          let image = nativeImage.createFromPath(args)
          this.setState({
            image: image.toDataURL()
          })
        })
    }

    handleButtonClick = () => {
        ipcRenderer.send('open-file')
    }

    render(){
        return(
            <div className="image-load">
                <img src={this.state.image} className="image-preview" alt="preview" />
                <button onClick={this.handleButtonClick}>Open file</button>
            </div>
        )
    }
}

export default ImageLoad;