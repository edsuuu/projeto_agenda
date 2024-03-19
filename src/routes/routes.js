const express = require('express');
const route = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');

//rota da home
route.get('/', homeController.index);

//Rotas de login

route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.logar);


module.exports = route;