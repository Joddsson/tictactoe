'use strict'

var createGamePage = function() {
	this.container 			= element(by.css('.main-container'));
	this.userName 			= this.container.element(by.css('#createrUserName'));
	this.gameName 			= this.container.element(by.css('#gameName'));
	this.createGameButton 	= this.container.element(by.css('#createGameButton'));
};

module.exports = new createGamePage();