'use strict';

describe('Tictactoe game play', function () {
	var createPage;

	beforeEach(function () {
		browser.get('/');
		createPage = require('./creategame.po');
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
		tictactoe.gameUrl.getAttribute('href').then(function(gameUrl){
			browser.getAllWindowHandles().then(function(handles){
				var creatorHandle = handles[0];
				var joinHandle = 'joinWindow';

				browser.executeScript('window.open("' + gameUrl + '", ' + '"' + joinHandle + '"' + ')');
				browser.sleep(2000);
				//tictactoe.opponentName.sendKeys('Valli');
				tictactoe.joinGameButton.click();
			});
		});


		/*placeMove(tictactoe.x0y0, 'X');
		placeMove(tictactoe.x0y1, 'O');
		placeMove(tictactoe.x1y1, 'X');
		placeMove(tictactoe.x1y2, 'O');
		placeMove(tictactoe.x2y2, 'X');

		expect(tictactoe.winner.getText()).toBe('Winner: X');*/
	});

});