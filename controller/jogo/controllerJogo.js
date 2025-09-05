/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ************************************************************************************/

//Import do arquivo de configuração para mensagens e status code
const MESSAGE   = require('../../modulo/config.js')
const FUNCTIONS = require('../../modulo/functions.js')

//Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')

//Import do arquivo de UPLOAD da AZURE
const upload = require('../upload/controllerUploadSotargeAzure.js')

//Função para inserir um novo jogo
const inserirJogo = async function(jogo, imagem, contentType){
  try {

      if(contentType == 'application/json' ||  String(contentType).split(';')[0] == 'multipart/form-data'){
        if(
            jogo.nome               == undefined   ||  jogo.nome            == ''       ||    jogo.nome             == null   || jogo.nome.length            > 80 ||
            jogo.data_lancamento    == undefined   ||  jogo.data_lancamento == ''       ||    jogo.data_lancamento  == null   || jogo.data_lancamento.length > 10 ||
            jogo.versao             == undefined   ||  jogo.versao          == ''       ||    jogo.versao           == null   || jogo.versao.length          > 10 ||
            jogo.tamanho            == undefined   ||  jogo.tamanho.length      > 10    ||
            jogo.descricao          == undefined   ||
            jogo.senha              == undefined   ||  jogo.senha.length        > 300   ||
            jogo.link               == undefined   ||  jogo.link.length         > 200 
          ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
          }else{
            /*Tratamento para upload de imgens*/
            let urlFoto = ''
            
            if(jogo.foto_capa != undefined) {
                urlFoto = await upload.uploadFiles(imagem)
                if(!urlFoto)
                  return MESSAGE.ERROR_REQUIRED_FIELDS_IMAGE //400 IMAGEM
            }else{
                urlFoto = 'semfoto.png';
            }

              jogo.foto_capa = urlFoto
              
              //Tratamento para gerar a hash da senha
              let newSenha = FUNCTIONS.createHash(jogo.senha)
              jogo.senha = newSenha
              
              //Encaminha os dados do novo jogo para ser inserido no BD
              let resultJogo = await jogoDAO.insertJogo(jogo)

              if(resultJogo)
                return MESSAGE.SUCCESS_CREATED_ITEM //201
              else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            } 
         
        }else{
          return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error)
        return  MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um jogo
const atualizarJogo = async function(jogo, imagem, id, contentType){

  //console.log(jogo)
  //console.log(id)

   // try {
      if(contentType == 'application/json' ||  String(contentType).split(';')[0] == 'multipart/form-data'){
          if(
            jogo.nome               == undefined   ||  jogo.nome            == ''       ||    jogo.nome             == null   || jogo.nome.length            > 80 ||
            jogo.data_lancamento    == undefined   ||  jogo.data_lancamento == ''       ||    jogo.data_lancamento  == null   || jogo.data_lancamento.length > 10 ||
            jogo.versao             == undefined   ||  jogo.versao          == ''       ||    jogo.versao           == null   || jogo.versao.length          > 10 ||
            jogo.tamanho            == undefined   ||  jogo.tamanho.length      > 10    ||
            jogo.descricao          == undefined   ||
            //jogo.senha              == undefined   ||  jogo.senha.length        > 300   ||
            jogo.link               == undefined   ||  jogo.link.length         > 200   ||
            id                      == undefined   ||  id == ''                         ||    id  == null                     || isNaN(id)                  || id<=0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultJogo = await buscarJogo(parseInt(id))

                if(resultJogo.status_code == 200){
                    //Update
                    
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    jogo.id = parseInt(id)
                    //console.log(jogo.foto_capa)
                    if(jogo.foto_capa != undefined) {
                      //console.log('foto')
                        urlFoto = await upload.uploadFiles(imagem)
                        if(!urlFoto)
                            return MESSAGE.ERROR_REQUIRED_FIELDS_IMAGE //400 IMAGEM
                    }else{
                        console.log('aqui')
                        urlFoto = 'semfoto.png';
                    }

                    jogo.foto_capa = urlFoto
              
                    let result = await jogoDAO.updateJogo(jogo)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultJogo.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
      }else{
        return MESSAGE.ERROR_CONTENT_TYPE //415
      }
    //} catch (error) {
    //  console.log(error)
     // return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    //}
}

//Função para excluir um jogo
const excluirJogo = async function(id){
  try {
    if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
      let resultJogo = await buscarJogo(parseInt(id))

      if(resultJogo.status_code == 200){
          //Delete
          let result = await jogoDAO.deleteJogo(parseInt(id))

          if(result){
            return MESSAGE.SUCCESS_DELETED_ITEM //200
          }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
          }
      }else if(resultJogo.status_code == 404){
          return MESSAGE.ERROR_NOT_FOUND //404
      }else{
          return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
      }
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

//Função para retornar todos os jogos
const listarJogo = async function(){
  try {
    let dadosJogos = {}

    //Chama a função para retornar os dados do jogo
    let resultJogo = await jogoDAO.selectAllJogo()
   
    if(resultJogo != false || typeof(resultJogo) == 'object'){
      if(resultJogo.length > 0){
        
        //Cria um objeto do tipo JSON para retornar a lista de jogos
        dadosJogos.status = true
        dadosJogos.status_code = 200
        dadosJogos.items = resultJogo.length
        dadosJogos.games = resultJogo

        return dadosJogos //200
      }else{
        return MESSAGE.ERROR_NOT_FOUND //404
      }
    }else{
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }  

  } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }


  
}

//Função para buscar um jogo
const buscarJogo = async function(id){
  try {
    if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
      let dadosJogos = {}

      //Chama a função para retornar os dados do jogo
      let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))
    
      if(resultJogo != false || typeof(resultJogo) == 'object'){
        if(resultJogo.length > 0){
          
          //Cria um objeto do tipo JSON para retornar a lista de jogos
          dadosJogos.status = true
          dadosJogos.status_code = 200
          dadosJogos.games = resultJogo

          return dadosJogos //200
        }else{
          return MESSAGE.ERROR_NOT_FOUND //404
        }
      }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
      }  
    }
  } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

module.exports = {
  inserirJogo,
  atualizarJogo,
  excluirJogo,
  listarJogo,
  buscarJogo
} 