'use strict';

describe('Tictactoe game play', function () {
	var createPage;
	//var join;
	beforeEach(function () {
		browser.get('/');
		createPage = require('./creategame.po');
		//join = require('./joingame.po');
	});

	function placeMove(cellElement, expected) {
		browser.sleep(1000);
		cellElement.click();
		expect(cellElement.getText()).toBe(expected);
	}

	it('emit a game won if player wins in one player mode', function () {
		createPage.userName.sendKeys('koddsson');
		createPage.gameName.sendKeys('Second game');
		createPage.createGameButton.click();

		var tictactoe = require('./tictactoe.po');
		placeMove(tictactoe.x0y0, 'X');
		placeMove(tictactoe.x0y1, 'O');
		placeMove(tictactoe.x1y1, 'X');
		placeMove(tictactoe.x1y2, 'O');
		placeMove(tictactoe.x2y2, 'X');

		expect(tictactoe.winner.getText()).toBe('Winner: X');
	});

});