const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { userInfo } = require('os')
const fs = require('fs')


// to solve small Electron bugs
app.commandLine.appendSwitch('no-sandbox')

// implementation of the config.json file, located in the "V-Pass_Config" folder
fs.acces('./V-Pass_Config', async (err) =>{
    if(err){
        fs.mkdirSync('./V-Pass_Config')
        fs.writeFileSync('./V-Pass_Config/config.json', )
    }
    const config = require('./V-Pass_Config/config.json')
})


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
    mainWindow.removeMenu()
    mainWindow.loadFile(__dirname+`/html/index.html`)
    // mainWindow.webContents.openDevTools()
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

ipcMain.on('path', (event, data) =>{
    event.reply('reply', userInfo().username)
})