/***********************************************************************************
 * Objetivo: Criar uma API para realizar integração com banco de dados
 * Data: 20/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * Observações:
 *** Para criar a API precisa instalar:
 *      express             npm install express --save
 *      cors                npm install cors --save
 *      body-parser         npm install body-parser --save
 *** Para criar a conexão com banco de dados precisa instalar:
 *      prisma              npm install prisma --save
 *      @prisma/client      npm install @prisma/client --save
 * 
 *** Após a instalação do prisma e do prisma client, devemos:
        npx prisma init  (Inicializar o prisma no projeto)

     Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
        npx prisma migrate dev   
 ************************************************************************************/

//Import das bibliotecas para criar a API
const express       = require('express')
const cors          = require('cors')


//Cria o objeto app para criar a API
const app = express()

//Porta
const PORT = process.PORT || 8080

//Configurações do cors
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    app.use(cors())
    next()
})

//Import das Routers
const jogoRoutes    = require('./routes/jogo.routes.js');
const generoRoutes  = require('./routes/genero.routes.js');


//EndPoint para o encaminhamento das Rotas
app.use('/v1/controle-jogos/jogo',   cors(),    jogoRoutes)
app.use('/v1/controle-jogos/genero', cors(),   generoRoutes)


app.listen(PORT, function(){
    console.log('API aguardando Requisições...')
})

