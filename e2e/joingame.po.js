'use strict';

var _ = require('lodash');

var joinGamePage = function() {
    this.container      = element(by.css('.join-container'));
    this.joinGameForm   = this.container.element(by.css('.joinGameForm'));
    this.opponentName   = this.container.element(by.css('#opponentName'));
    this.joinGameButton = this.joinGameForm.element(by.css('#joinGameButton'));
};

module.exports = new joinGamePage();