var auth	= require("./auth.js"),
controller  = require("/.auth-controller.js"),
	express = require("express"),
	router  = express.Router();

	router.route("/")
	.post(auth.VerifyUser, controller.signIn);
