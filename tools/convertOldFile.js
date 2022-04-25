const aes = require('./aes')
const sha1 = require('crypto-js/sha1')

function convertOldFile(ancien_fichier, key) {
    nv_fichier = {}
    main_pass = ancien_fichier.split('}}}')[0]
    ancien_fichier = ancien_fichier.split('}}}')
    ancien_fichier.shift()

    ancien_fichier.forEach(element => {

        let temp_pass = element.split('{{{')[2]
        let buff = Buffer.from(temp_pass, 'base64')
        temp_pass = buff.toString('utf-8')

        temp_pass = aes.encode_aes(temp_pass, sha1(key).toString())

        nv_fichier[element.split('{{{')[0]] = {
            "username": element.split('{{{')[1],
            "pass": temp_pass
        }
    })
    return nv_fichier
}

module.exports = convertOldFile