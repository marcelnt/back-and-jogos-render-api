/***********************************************************************************
 * Objetivo:  arquivo de funções do projeto
 * Data: 04/09/2025
 * Autor: Marcel
 * Versão: 1.0
/************************************************************************************* */


const { createHmac } = require('node:crypto');
const crypto = require('crypto')


const createHashSegura = function (secret) {
    const newSecret =  crypto.randomUUID() + secret
    const hash = createHmac('sha256', newSecret)
               .update(secret)
               .digest('hex')

               return hash
}

const createHash = function (secret) {
    //const newSecret =  crypto.randomUUID() + secret
    const hash = createHmac('sha256', secret)
               .update(secret)
               .digest('hex')

               return hash
}

module.exports = {
    createHash,
    createHashSegura
}