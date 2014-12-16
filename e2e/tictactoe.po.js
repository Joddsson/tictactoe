'use strict';

var _ = require('lodash');

var TictactoePage = function() {
    this.container      = element(by.css('.play-container'));
    this.joinGameForm   = this.container.element(by.css('.joinGameForm'));
    this.grid           = this.container.element(by.css('.grid'));
    this.shareURL       = this.container.element(by.css('.shareUrl'));

    this.winner     = this.container.element(by.css('.winner'));
    //this.gameUrl    = this.shareUrl.element(by.css('#joinUrl'));

    this.x0y0 = this.grid.element(by.css('#nr1'));
    this.x0y1 = this.grid.element(by.css('#nr2'));
    this.x0y2 = this.grid.element(by.css('#nr3'));

    this.x1y0 = this.grid.element(by.css('#nr4'));
    this.x1y1 = this.grid.element(by.css('#nr5'));
    this.x1y2 = this.grid.element(by.css('#nr6'));

    this.x2y0 = this.grid.element(by.css('#nr7'));
    this.x2y1 = this.grid.element(by.css('#nr8'));
    this.x2y2 = this.grid.element(by.css('#nr9'));

};

module.exports = new TictactoePage();