var express = require("express"),
	api		= express.Router(),
	adminRouter = require("./v1/admin/admin-router.js"),
	customerRouter = require("./v1/customer/customer-router.js"),
	cusAuth		= 	 require("./v1/auth/cus-auth-router.js"),
	transactionRouter =	 require("./v1/transaction/transaction-router.js"),
	authRouter	= require("./v1/auth/auth-router.js");

	//mount the routers on the API

	api.use("/admin",adminRouter);
	api.use("/auth", authRouter);
	api.use("/customer", customerRouter);
	api.use("/customerAuth", cusAuth);
	api.use("/transaction", transactionRouter);

	module.exports = api;

