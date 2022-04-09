const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const sha256 = require('crypto-js/sha256')
const aes = require('crypto-js/aes')


// to solve small Electron bugs
app.commandLine.appendSwitch('no-sandbox')

const default_config = {
    path: __dirname + '\\V-Pass_Config\\pass.json',
    main_hash: '0'
}

var config, pass

// implementation of the config.json file, located in the "V-Pass_Config" folder
fs.access('./V-Pass_Config', fs.constants.R_OK, async (err) => {
    if (err) {
        fs.mkdirSync('./V-Pass_Config') // folder creation
        fs.writeFile('./V-Pass_Config/pass.json', '{}', { flag: "wx" }, () => { })
        fs.writeFile('./V-Pass_Config/config.json', JSON.stringify(default_config), { flag: "wx" }, () => {
            config = require('./V-Pass_Config/config.json')
            pass = require('./V-Pass_Config/pass.json')
        })
    }
    else {
        config = require('./V-Pass_Config/config.json')
        pass = require('./V-Pass_Config/pass.json')
    }
})

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
    if (typeof config === "undefined") {
        mainWindow.loadFile(__dirname + `/html/inscription.html`)
    }
    else {
        if (config.main_hash == '0') {
            mainWindow.loadFile(__dirname + `/html/inscription.html`)
        }
        else {
            mainWindow.loadFile(__dirname + `/html/login.html`)
        }
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

ipcMain.on('login', (e, d) => {
    config.main_hash = sha256(d).toString()
    fs.writeFile('./V-Pass_Config/config.json', JSON.stringify(config), () => {})
    mainWindow.loadFile(__dirname + `/html/index.html`)
})