'use strict';
console.log("in api create game");
var express = require('express');
var ctrl	= require('../command.controller.js');

var router 	= express.Router();

router.post('/', ctrl.executeCommand);

module.exports = router;