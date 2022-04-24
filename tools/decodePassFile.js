const aes = require('./tools/aes')

function decodePassFile(code, key) {
    let decode = code
    for (const [site, data] of Object.entries(code)) {
        decode[site]['pass'] = aes.decode_aes(data.pass, key)
    }
    return decode
}

module.exports = {
    decodePassFile
}