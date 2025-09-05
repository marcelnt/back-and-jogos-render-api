/***************************************************************************************
 * Objetivo: Arquivo de padronização de mensagens e status code para o projeto
 * Data: 20/02/2025
 * Autor: Marcel
 * Versão
 ***************************************************************************************/

/******************* MENSAGENS DE ERRO *********************************/
const ERROR_REQUIRED_FIELDS                 =   {status: false, status_code: 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada !!!"}
const ERROR_REQUIRED_FIELDS_IMAGE           =   {status: false, status_code: 400, message: "Arquivo da imagem enviada esta com problemas e não foi possível fazer a Requisição !!!"}
const ERROR_INTERNAL_SERVER_CONTROLLER      =   {status: false, status_code: 500, message: "Não foi possivel processar a requisição, pois, ocorreram erros internos no servidor da CONTROLLER !!!"}
const ERROR_INTERNAL_SERVER_MODEL           =   {status: false, status_code: 500, message: "Não foi possivel processar a requisição, pois, ocorreram erros internos no servidor da MODEL !!!"}
const ERROR_CONTENT_TYPE                    =   {status: false, status_code: 415, message: "Não foi possível processar a requisição, pois, o formato de dados encaminhado não é suportado pelo servidor. Favor encaminhar apenas JSON!!!"}
const ERROR_NOT_FOUND                       =   {status: false, status_code: 404, message: "Não foram encontrados itens para retornar!!!"}
/******************* MENSAGENS DE SUCESSO ******************************/
const SUCCESS_CREATED_ITEM      =   {status: true, status_code: 201, message: "Item criado com sucesso!!!"}
const SUCCESS_DELETED_ITEM      =   {status: true, status_code: 200, message: "Item excluído com sucesso!!!"}
const SUCCESS_UPDATED_ITEM      =   {status: true, status_code: 200, message: "Item atualizado com sucesso!!!"}


module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_REQUIRED_FIELDS_IMAGE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM

} 