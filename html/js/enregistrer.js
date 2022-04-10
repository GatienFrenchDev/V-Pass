const { ipcRenderer } = require('electron')

document.getElementById('envoi').addEventListener("click", (event) =>{
    ipcRenderer.send('enregistrer', document.getElementById('mdp').value)
})
