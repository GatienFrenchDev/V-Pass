const { ipcRenderer } = require('electron')

/*
get the username and put it in the right place
*/
ipcRenderer.send('username')
ipcRenderer.on('reply', (event, data) =>{
    document.getElementById('username').innerText = data
})