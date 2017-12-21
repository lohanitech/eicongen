import React from 'react';
import logo from './logo.svg';
import './styles.css';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer;
const nativeImage = electron.nativeImage

class ImageLoad extends React.Component{
    state = {
        image: logo,
        dragEnter: false
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
        this.dragEnd(ev)
        let files = ev.dataTransfer.files
        if(files && files.length > 0){
            this.loadImageFromPath(files[0].path)
        }
    }

    dragEnter = ev => {
        ev.preventDefault()
        this.setState({dragEnter: true})
    }


    dragEnd = ev => {
        ev.preventDefault()
        this.setState({dragEnter: false})
    }
    
    render(){
        return(
            <div
                onDrop={this.handleDrop}
                onDragLeave={this.dragEnd}
                onDragOver={this.dragEnter}
                className={"image-load " + (this.state.dragEnter && 'drag-enter')}
            >
                <img src={this.state.image} className="image-preview" alt="preview" />
                <button onClick={this.handleButtonClick}>Open file</button>
            </div>
        )
    }
}

export default ImageLoad;