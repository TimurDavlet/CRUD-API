/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { server, db } from '../src/server.js';

// eslint-disable-next-line no-unused-vars
let should = chai.should();

chai.use(chaiHttp);

describe('db', () => {
	let length = db.length;
	db.splice(0, length);

	describe('/GET User', () => {
		it('Get all records with a GET api/users request (an empty array is expected)', (done) => {
			chai.request(server)
				.get('/api/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});
	describe('/POST user', () => {
		it('it should not POST a user without username field', (done) => {
			let user = {
				age: 8,
				hobbies: []
			};
			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.should.have.property('text').eql('Invalid body data was provided');
					done();
				});
		});
		it('POST user add', (done) => {
			let user = {
				username: 'Test',
				age: 8,
				hobbies: []
			};
			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('username').eql('Test');
					res.body.should.have.property('age').eql(8);
					res.body.should.have.property('hobbies').eql([]);
					done();
				});
		});
	});
	describe('/GET User id', () => {
		it('it should GET user id', (done) => {
			chai.request(server)
				.get('/api/users/3')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('username').eql('Test');
					res.body.should.have.property('age').eql(8);
					res.body.should.have.property('hobbies').eql([]);
					res.body.should.have.property('id').eql(3);
					done();
				});
		});
	});
	describe('/PUT User id', () => {
		it('it should PUT new object', (done) => {
			let user = {
				username: 'Test2',
				age: 10,
				hobbies: []
			};
			chai.request(server)
				.put('/api/users/3')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('username').eql('Test2');
					res.body.should.have.property('age').eql(10);
					res.body.should.have.property('hobbies').eql([]);
					res.body.should.have.property('id').eql('3');
					done();
				});
		});
	});
	describe('/DELETE User id', () => {
		it('it should DELETE user id', (done) => {
			chai.request(server)
				.delete('/api/users/3')
				.end((err, res) => {
					res.should.have.status(204);
					done();
				});
		});
	});
	describe('/GET User id', () => {
		it('With a GET api/users/{userId} request, we are trying to get a deleted object by id', (done) => {
			chai.request(server)
				.get('/api/users/3')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.should.have.property('text').eql('userId not found');
					done();
				});
		});
	});
});