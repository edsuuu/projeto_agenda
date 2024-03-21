const express = require('express');
const route = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const contatoController = require('../controllers/contatoController.js');

const { loginRequired } = require('../middlewares/middleware');

//rota da home
route.get('/', homeController.index);

//Rotas de login

route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rota de contato

route.get('/contato/index', loginRequired, contatoController.contato);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;