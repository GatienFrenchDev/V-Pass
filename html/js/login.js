const { ipcRenderer } = require('electron')

document.getElementById('envoi').addEventListener("click", (event) =>{
    ipcRenderer.send('login', document.getElementById('mdp').value)
})


// événement qui se déclenche quand on rentre le mauvais mdp lors de la connexion
ipcRenderer.on('reply', (e, d) =>{
    
})