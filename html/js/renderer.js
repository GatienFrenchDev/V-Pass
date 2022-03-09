const { ipcRenderer } = require('electron')

ipcRenderer.send('username')
ipcRenderer.on('reply', (event, data) =>{
    document.getElementById('username').innerText = data
})