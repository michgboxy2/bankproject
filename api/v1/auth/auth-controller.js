var auth 	= require("./auth.js");


	exports.signIn = (req, res, next) => {
		var token = auth.signToken(req.admin._id);
		res.status({_token : token});
	}