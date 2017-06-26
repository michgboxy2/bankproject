var request = require('supertest'),
	chai	= require('chai'),
	expect	= chai.expect,
	should	= chai.should(),
	app		= require('./server.js'),
	assert  = chai.assert;

	//integration test for the admin endpoints
	describe("Admin Endpoints", function(){
		it.skip("should add an admin", function(next) {

				var data = {
					'username' : "Michaellllii",
					'password' : "King"
				}

				request(app)
						.post("/api/v1/admin")
						.send(data)
						.set("Content-Type", "Application/json")
						.expect(200)
						.end(function(err, res) {
							//expect(res.body).to.be.an("object");
							expect(res.body.username).to.be.equal("Michaellllii");
							//console.log(res.body);
							res.body.should.be.json;
							next();
						})

			})
		it.skip("should fetch all admins", function(next){

			request(app)
			.get("/api/v1/admin")
			.expect(200)
			.set("Content-Type", "Application/json")
			.end(function(err, res){
				res.body.should.be.json;
				//console.log(res.body);

				next();
			})
		})
		it.skip("should fetch one admin by Id", function(next){
			var id = "5940b1081264a709b59812d5";
			request(app)
			.get("/api/v1/admin/"+id)
			.expect(200)
			.set("Content-Type", "Application/json")
			.end(function(err, res){
				res.body.should.be.json;
				console.log(res.body);
				next();
			})
		})
		it("should delete an admin from the database", function(next){
			var data = {
				'username' : 'oo',
				'password' : 'oo'
			}

			request(app)
			.post("/api/v1/admin")
			.send(data)
			.expect(200)
			.set("Content-Type", "Application/json")
			.end(function(err, res){
				request(app)
				.delete("/api/v1/admin/"+data._id)
				.get("/api/v1/admin/"+data._id)
				.expect(200)
				.set("Content-Type", "Application/json")
				.end(function(err, res){
					res.body.username.should.be.empty;
				})

			})
		})
	})