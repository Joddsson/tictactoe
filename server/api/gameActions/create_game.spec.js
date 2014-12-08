var should 	= require('should');
var request = require('supertest');
var app 	= require('../../app');

describe("POST /api/createGame ", function(){
	it("should respond with a JSON array", function(){
		request(app)
			.get('/api/createGame')
			.expect(200)
			.expect('Content-Type', /json/)
	});
});