var express = require('express');
var ctrl	= require('../command.controller.js');
var router 	= express.Router();

router.post('/', ctrl.executeCommand);

return { router:router }