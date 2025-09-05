const fetch = require('node-fetch').default;
// const express = require('express');
const Router        = require('express')
const router        = Router();
const bodyParser    = require('body-parser')

const multer        = require('multer'); //Import do multer para requisições form-data


//Estabelecndo o formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()


/**Multer */

// --- Configuração do Multer para armazenamento ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório onde os arquivos serão salvos.
        // Certifique-se de que o diretório 'uploads/' existe na raiz do seu projeto!
        cb(null, 'uploads/');
    
    }
});

// Inicializa o Multer com a configuração de armazenamento
const upload = multer();

/*** */

//Import das controlles para realizar o CRUD de dados
const controllerJogo = require('../controller/jogo/controllerJogo.js')


router.get('/',  async function(request, response){
        //Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para inserir um jogo no BD
router.post('/', bodyParserJSON, upload.single('foto_capa'),  async function(request, response){


    //Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body
    let imagem = request.file;

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultJogo = await controllerJogo.inserirJogo(dadosBody, imagem, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)

})

//EndPoint para buscar um jogo pelo ID
router.get('/:id', async function(request, response){
    //Recebe o ID do jogo na requisição
    let idJogo = request.params.id

    let resultJogo = await controllerJogo.buscarJogo(idJogo)
    
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

router.delete('/:id', async function(request, response){
    //Recebe o ID da requisição
    let idJogo = request.params.id

    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

router.put('/:id', bodyParserJSON, upload.single('foto_capa'), async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do jogo
    let idJogo = request.params.id
    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body
    let imagem = request.file

    
    let resultJogo = await controllerJogo.atualizarJogo(dadosBody, imagem, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)

})


module.exports = router;