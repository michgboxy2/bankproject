var auth	= 		require("./auth.js"),
	cusauth = 		require("./cus-auth.js"),
	cusController = require("./cus-auth-controller.js"),
	controller  = 	require("./auth-controller.js"),
	express = 		require("express"),
	router  = 		express.Router();

	router.route("/")
	.post(auth.verifyUser, controller.signIn)
	.post(cusauth.verifyCustomer, cusController.signIn);
	
	module.exports = router;
