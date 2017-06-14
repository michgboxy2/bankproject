var  cusModel = require("./customer-model.js"),
	 auth	  = require("../auth/auth-js");


	 exports.InterceptId = (req, res,next,id) => {
	 	cusModel.findById(id).then((data) =>{
	 		if(!data){ return next(new Error("can't find id"));}
	 		req.customer = data;
	 		next();
	 	}, (err) => { return next(err);})
	 }