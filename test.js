const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json");

var should = require('chai').should()

const baseUrl = "http://localhost:3000";

const titel = "HEEY";
const content = "WHATS GOING OOOOOOOOOOOOOON"
const notesdata = {
	"title" : titel,
	"content" : content,
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
	//load specific
	it("get a specific Note", function(done){
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

describe("Update Notes", function() {
	it("Change Note 1", function(done){
		chai.request(baseUrl)
			.put("/notes/" + notesdata.id)
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({title: titel, content : content})
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			})
	});

	it("Create note", function(done){
		chai.request(baseUrl)
			.post("/notes")
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({data: JSON.stringify(notesdata)})
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			})
	});

});

