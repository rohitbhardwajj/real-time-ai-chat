const routes = require("express").Router();
const {signupController , loginController} = require("./../controller/signupController");

routes.post('/auth/signup',signupController);
routes.post('/auth/login',loginController);

module.exports = routes;