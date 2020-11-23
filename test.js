const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json");

var should = require('chai').should()

const baseUrl = "http://localhost:3000";

const notesdata = {
	"title" : "HEY",
	"content": "whats going on",
	"id": 1
};


chai.use(chaiHttp);
chai.use(chaiJson);

describe("load notes", function() {
	it("get all notes", function(done) {
		chai.request(baseUrl)
			.get("/notes")
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a('Object');
				done();
		})
	});
});

describe("get a note by id", function() {
	it("get a Note", function(done){
		chai.request(baseUrl)
			.get("/notes/" + notesdata.id)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.have.property("id");
				res.body.id.should.equal(notesdata.id);
				res.body.title.should.equal(notesdata.title);
				res.body.content.should.equal(notesdata.content);
				done();
			})
	});

});

