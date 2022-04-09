const { ipcRenderer } = require('electron')

document.getElementById('envoi').addEventListener("click", (event) =>{
    ipcRenderer.send('login', document.getElementById('mdp').value)
})

ipcRenderer.on('reply', (e, d) =>{
    console.log(d)
})