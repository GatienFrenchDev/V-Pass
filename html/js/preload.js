const { contextBridge } = require('electron')

console.log(process.env.username)

contextBridge.exposeInMainWorld('envVars', {
    myEnvironmentVariable: process.env.MY_ENVIRONMENT_VARIABLE
})