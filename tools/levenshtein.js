const levenshtein = require('js-levenshtein')
const logos = require('../rsc/logos.json')


function getLogo(site) {
    liste = []
    let temp
    for (const [key, value] of Object.entries(logos)) {
        temp = levenshtein(site, key)
        if(temp<5){
            liste.push([temp, value])
        }
    }
    if(liste.length == 0){
        return false
    }
    else{
        liste.sort((a, b) =>{
            return a
        })
        return liste[0][1]
    }
}

module.exports = {
    getLogo
}