const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const sha256 = require('crypto-js/sha256')
const sha1 = require('crypto-js/sha1')
const levenshtein = require('./tools/levenshtein')

// const discord_status = require('./tools/discord_status')

let main_pass


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
    main_pass = d
    config.main_hash = sha256(d).toString()
    fs.writeFile('./V-Pass_Config/config.json', JSON.stringify(config), () => { })
    getMainWindow().loadFile(__dirname + `/html/index.html`)
})

ipcMain.on('ajouter', (e, d) =>{

    /*
        d = {
            "site" : "twitter",
            "username" : "@xolork_",
            "pass" : "!SuperSekurP@ss5"

        }
    */

    if(d.site in pass){
        return false
    }
    pass[d.site] = {
        'username': d.username,
        'pass': aes.encode_aes(d.pass, sha1(main_pass).toString())
    }
    fs.writeFile('./V-Pass_Config/pass.json', JSON.stringify(pass), () => { })
    return true
})

ipcMain.on('login', (e, d) => {
    main_pass = d
    if (sha256(d).toString() == config.main_hash) {
        getMainWindow().loadFile(__dirname + `/html/index.html`)
    }
    else {
        e.reply('reply', false)
    }
})