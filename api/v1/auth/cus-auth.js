var expressjwt =	require("express-jwt"),
	jwt 	   =    require("jsonwebtoken"),
	cusModel   =	require("../customer/customer-model.js"),
	checkToken =    expressjwt({secret : "jsonwed"});



	exports.decodeToken = (req, res, next) => {
		checkToken(req,res, next);
	}


	exports.verifyCustomer = (req, res, next) => {
		
			var email		= req.body.email,
				password 	= req.body.password;
			

			if(!email || !password){ return next(new Error("please enter email/password"));}

			customer.find({}).populate('admin').exec(callback);


			cusModel.findOne({email : email}).then(function(customer){
				if(!customer){ return next(new Error("invalid email or password"));}

				if(!customer.authenticate(password)){ return next(new Error("incorrect username/password"));}

				res.body = customer;
				next();
			}, (err) => { return next(err);})


	}

	exports.signToken = (id) => {
				return jwt.sign(
						{_id : id},
						"jsonweb",
						{expiresIn : 24 * 7 * 3600}
						)
	}