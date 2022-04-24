const aes = require('crypto-js/aes')

function decode_aes(encoded_string, key){
    const temp = aes.decrypt(encoded_string, key).toString()
    return decodeURIComponent(temp.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'))
}

function encode_aes(string, key){
    return aes.encrypt(string, key)
}


module.exports = {
    decode_aes,
    encode_aes
}