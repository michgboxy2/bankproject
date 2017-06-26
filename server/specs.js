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
					'username' : "Michael",
					'password' : "King"
				}

				request(app)
						.post("/api/v1/admin")
						.send(data)
						.set("Content-Type", "Application/json")
						.expect(200)
						.end(function(err, res) {
							//expect(res.body).to.be.an("object");
							expect(res.body.username).to.be.equal("Michael");
							//console.log(res.body);
							//res.body.should.be.json;
							next();
						})

			})
		it("should fetch all admins", function(next){

			request(app)
			.get("/api/v1/admin")
			.expect(200)
			.set("Content-Type", "Application/json")
			.end(function(err, res){
				res.body.should.be.json;
				next();
			})
		})
	})