const { ipcRenderer } = require('electron')

ipcRenderer.send('pass')
ipcRenderer.on('reply', (event, data) =>{
    console.log(data)
})