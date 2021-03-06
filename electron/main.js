const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron')
const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let selectedImagePath

Menu.setApplicationMenu(null)
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 400,
    resizable: false,
    maximizable: false,
    fullscreenable: false
  })
  win.setMenu(null)


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);


  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})


ipcMain.on('open-file', (event,arg)=>{
    openFileDialog()
})

function openFileDialog() {
    dialog.showOpenDialog(win,{title: "Open image"}, (paths)=>{
      if(paths){
        selectedImagePath = paths[0]
        win.webContents.send('file-opened',selectedImagePath);

      }
    })
}


ipcMain.on('select-target-folder', (event, arg) => {
  openSelectTargetFolder(arg)
})

function openSelectTargetFolder(defaultPath) {
  dialog.showOpenDialog(win,{
    title: "Save generated icons to",
    properties: ["openDirectory"],
    defaultPath: defaultPath,
    buttonLabel: "Save"
  }, paths => {
    if(paths && paths.length > 0){
      win.webContents.send('target-folder-opened', paths[0])
    }
  })
}