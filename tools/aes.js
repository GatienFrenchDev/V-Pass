const aes = require('crypto-js/aes')

function decode_aes(encoded_string, key){
    const temp = aes.decrypt(encoded_string, key).toString()
    return decodeURIComponent(temp.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'))
}


module.exports = {
    decode_aes
}