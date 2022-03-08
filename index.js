const { app, BrowserWindow } = require('electron')
const path = require('path')


/*
to solve small Electron bugs
*/
app.commandLine.appendSwitch('no-sandbox')
app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendSwitch('disable-software-rasterizer')
app.commandLine.appendSwitch('disable-gpu-compositing')
app.commandLine.appendSwitch('disable-gpu-rasterization')
app.commandLine.appendSwitch('disable-gpu-sandbox')
app.commandLine.appendSwitch('--no-sandbox')
app.disableHardwareAcceleration()

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 650,
        webPreferences: {
            nodeIntegration: true
        },
        preload : path.join(__dirname, '/html/js/preload.js')
    })

    mainWindow.loadFile(__dirname+'/html/index.html')
}

app.on('ready', loadMainWindow)


app.on('activate', () =>{
    if(BrowserWindow.getAllWindows().length === 0){
        loadMainWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})