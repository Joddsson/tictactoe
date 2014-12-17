'use strict';

var _ = require('lodash');

var joinGamePage = function() {
    this.container      = element(by.css('.join-container'));
    this.divJoinForm    = this.container.element(by.css('.theForm'));
    this.opponentName   = this.container.element(by.css('#opponentName'));
    this.joinGameButton = this.container.element(by.css('#joinGameButton'));
};

module.exports = new joinGamePage();