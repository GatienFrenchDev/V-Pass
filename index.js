const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { userInfo } = require('os')

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
        resizable: false,
        title: 'V-Pass',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation : false
        },
        preload : path.join(__dirname, '/js/preload.js')
    })
    mainWindow.loadFile(__dirname+`/html/index.html`)
    mainWindow.webContents.openDevTools()
    // mainWindow.webContents.send('username', userInfo().username)
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

ipcMain.on('username', (event, data) =>{
    event.reply('reply', userInfo().username)
})