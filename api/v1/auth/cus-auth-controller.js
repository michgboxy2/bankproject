var auth = require("./cus-auth.js");

	
	//sign in a verified user..
	exports.signIn = (req, res, next) => {

	var token  =	auth.signToken(req.customer._id);

	res.status(200).json({_token : token});

}