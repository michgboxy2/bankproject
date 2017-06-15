var  cusModel = require("./customer-model.js"),
	 adminModel = require("../admin/admin-model.js"),
	 auth	  = require("../auth/auth.js");


	 exports.InterceptId = (req, res,next,id) => {
	 	cusModel.findById(id).then((data) =>{
	 		if(!data){ return next(new Error("can't find id"));}
	 		req.customer = data;
	 		next();
	 	}, (err) => { return next(err);})
	 }

	 exports.RegisterCustomer = (req, res, next) => {
	 	var customer = req.body,
	 		//admin    = req.body,
	 		customerObj = new cusModel(customer);

	 		customerObj.save((err, data) => {
	 			if(err){ return next( new Error("can't register customer"));}
	 			data = data.toObject();
	 			var token = auth.signToken(data._id);
	 			data["_token"] = token;
	 			res.status(200).json(data);
	 		})
	 }

	 exports.RemoveCustomer = (req, res, next) => {
	 	var id = req.params.id;

	 	cusModel.findByIdAndRemove(id).then((data) => {
	 		if(!data){ return next(new Error("can't remove customer"));}
	 		res.status(200).json(data);
	 	},(err) => { return next(err);})
	 }

	 exports.FetchAllCustomers = (req, res, next) => {
	 	cusModel.find((err, data) => {
	 		if(err){ return next(new Error("can't fetch all customers"));}
	 		res.status(200).json(data);
	 	})
	 }

	 exports.FetchOneCustomer = (req, res, next)=> {
	 	if(!req.customer){return next(new Error("can't find customer"));}
	 	res.status(200).json(req.customer);
	 }

	 exports.EditCustomer = (req, res, next) => {
	 	var id = req.params.id;
	 	cusModel.findByIdAndUpdate(id, req.body).then((data) => {
	 		if(!data){return next(new Error("can't update customer"));}
	 		res.status(200).json(data);
	 	}, (err)=>{ return next(err);})
	 }