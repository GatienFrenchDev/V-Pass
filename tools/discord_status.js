const DiscordRPC = require('discord-rpc')

const clientId = '964614100573364224'


const client = new DiscordRPC.Client({ transport: 'ipc' })


let activity = {
    details: "Gestionnaire de mots de passe Open Source",
    assets: {
        large_image: "padlock",
        large_text: "V-Pass",
        small_image: "small",
        small_text: "v 0.2.5",
    },
    buttons: [
        {
            "label": "Téléchargement du logiciel",
            "url": "https://github.com/GatienFrenchDev/V-Pass"
        },
    ],
    timestamps: { start: Date.now() },
    instance: true,
}

client.on('ready', async () => {
    client.request("SET_ACTIVITY", { pid: process.pid, activity: activity })
})

client.login({ clientId: clientId })