const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const util = require('util')
const fs = require('fs')
const sha256 = require('crypto-js/sha256')
const aes = require('crypto-js/aes')


// to solve small Electron bugs
app.commandLine.appendSwitch('no-sandbox')

const default_config = {
    path: __dirname + '\\V-Pass_Config\\pass.json',
    main_hash: '0'
}

// implementation of the config.json file, located in the "V-Pass_Config" folder
fs.access('./V-Pass_Config', fs.constants.R_OK, async (err) => {
    if (err) {
        fs.mkdirSync('./V-Pass_Config') // folder creation
        fs.writeFile('./V-Pass_Config/pass.json', '{}', { flag: "wx" }, () => {})
        fs.writeFile('./V-Pass_Config/config.json', JSON.stringify(default_config), { flag: "wx" }, () => {})
    }
})


const config = require('./V-Pass_Config/config.json') // import config file
const pass = require('./V-Pass_Config/pass.json') // import pass file

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 650,
        resizable: false,
        title: 'V-Pass',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        preload: path.join(__dirname, '/js/preload.js')
    })
    mainWindow.removeMenu()
    if (config.main_hash == '0') {
        mainWindow.loadFile(__dirname + `/html/inscription.html`)
    }
    else {
        mainWindow.loadFile(__dirname + `/html/login.html`)
    }
    mainWindow.webContents.openDevTools()
}

app.on('ready', loadMainWindow)


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


ipcMain.on('pass', (event, data) => {
    event.reply('reply', pass)
})