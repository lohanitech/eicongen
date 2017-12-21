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
            this.loadImageFromPath(args)
        })
    }
    
    loadImageFromPath = path => {
        this.props.onLoadImage(path)
        let image = nativeImage.createFromPath(path)
        this.setState({
            image: image.toDataURL()
        })
    }

    handleButtonClick = () => {
        ipcRenderer.send('open-file')
    }

    handleDrop = ev => {
        ev.preventDefault()
        let files = ev.dataTransfer.files
        if(files && files.length > 0){
            this.loadImageFromPath(files[0].path)
        }
    }

    render(){
        return(
            <div onDrop={this.handleDrop} onDragOver={ev=>ev.preventDefault()} className="image-load">
                <img src={this.state.image} className="image-preview" alt="preview" />
                <button onClick={this.handleButtonClick}>Open file</button>
            </div>
        )
    }
}

export default ImageLoad;