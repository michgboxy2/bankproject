var express		= require("express"),
	cors		= require("cors"),
	bps			= require("body-parser"),
	morgan		= require("morgan"),
	app			= express(),
	api			= require("../api/api.js");


	app.use(bps.json());
	app.use(bps.urlencoded({extended : true}));
	app.use(cors());
	app.use(morgan("dev"));

	app.use("/api/v1", api);

	app.use((err, req, res, next) => {
		res.status(500).json(err.message);
		next();
	})

	module.exports = app;