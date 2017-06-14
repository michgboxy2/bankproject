var express = require("express"),
	api		= express.Router(),
	adminRouter = require("./v1/admin/admin-router.js"),
	authRouter	= require("./v1/auth/auth-router.js");

	//mount the routers on the API

	api.use("/admin",adminRouter);
	api.use("/auth", authRouter);

	module.exports = api;

