/***************************************************************************************
 * Objetivo: Arquivo resposnsável por realizar UPLOAD de arquivos na Azure
 * Data: 20/06/2025
 * Autor: Marcel
 * Versão: 1.0
 ***************************************************************************************/

const AZURE = require('../../modulo/uploadAzureConfig.js')

//upload da imagem
const uploadFiles = async function (imagem) {

    let fileName = Date.now() + imagem.originalname
    
    let urlPublica  = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`
    let url         = `${urlPublica}?${AZURE.TOKEN}`

    let resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'application/octet-stream'
        },
        body: imagem.buffer
    })
    
    if(resposta.status == 201)
        return urlPublica
    else
        return false
}

module.exports = {uploadFiles}