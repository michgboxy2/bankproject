var express =	require("express"),
	router = 	express.Router(),
	controller = require("./cus-auth-controller.js"),
	auth 	   = require("./cus-auth.js");


	router.route("/")
	.post(auth.verifyCustomer, controller.signIn);

	module.exports = router;






