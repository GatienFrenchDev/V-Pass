const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const sha256 = require('crypto-js/sha256')
const aes = require('./tools/aes')
const levenshtein = require('./tools/levenshtein')


// to solve small Electron bugs
app.commandLine.appendSwitch('no-sandbox')

const default_config = {
    path: __dirname + '\\V-Pass_Config\\pass.json',
    main_hash: '0'
}
try{
    var config = require('./V-Pass_Config/config.json')
    var pass = require('./V-Pass_Config/pass.json')
}
catch{
    var config = {}
    config.main_hash = "0"
}

// implementation of the config.json file, located in the "V-Pass_Config" folder
fs.access('./V-Pass_Config', fs.constants.R_OK, async (err) => {
    if (err) {
        fs.mkdirSync('./V-Pass_Config') // folder creation
        fs.writeFile('./V-Pass_Config/pass.json', '{}', { flag: "wx" }, () => { })
        fs.writeFile('./V-Pass_Config/config.json', JSON.stringify(default_config), { flag: "wx" }, () => {
            config = require('./V-Pass_Config/config.json')
            var pass = require('./V-Pass_Config/pass.json')
        })
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
    process.env.MAIN_WINDOW_ID = mainWindow.id
    mainWindow.removeMenu()
    if (config.main_hash == "0") {
        mainWindow.loadFile(__dirname + `/html/inscription.html`)
    }
    else {
        mainWindow.loadFile(__dirname + `/html/login.html`)
    }
    // mainWindow.webContents.openDevTools()
}

app.on('ready', loadMainWindow)

const getMainWindow = () => {
    const ID = process.env.MAIN_WINDOW_ID * 1
    return BrowserWindow.fromId(ID)
}

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

ipcMain.on('enregistrer', (e, d) => {
    config.main_hash = sha256(d).toString()
    fs.writeFile('./V-Pass_Config/config.json', JSON.stringify(config), () => { })
    getMainWindow().loadFile(__dirname + `/html/index.html`)
})

ipcMain.on('login', (e, d) => {
    if (sha256(d).toString() == config.main_hash) {
        getMainWindow().loadFile(__dirname + `/html/index.html`)
    }
    else {
        e.reply('reply', false)
    }
})