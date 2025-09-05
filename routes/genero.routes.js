// const express = require('express');
const Router = require('express')
const router = Router();
const bodyParser    = require('body-parser')

//Estabelecndo o formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Import das controlles para realizar o CRUD de dados
// const controllerJogo = require('../controller/jogo/controllerJogo.js')

router.get('/',  async function(request, response){
    
    response.status(200)
    response.json({'message': 'Página de rota de genero'})
})




module.exports = router;