var  cusModel = require("./customer-model.js"),
	 admin = require("../admin/admin-model.js"),
	 auth	  = require("../auth/auth.js");



	 exports.InterceptId = (req, res,next,id) => {
	 	cusModel.findById(id).then((data) =>{
	 		if(!data){ return next(new Error("can't find id"));}
	 		req.customer = data;
	 		next();
	 	}, (err) => { return next(err);})
	 }

	 exports.RegisterCustomer = (req, res, next) => {
	 	//console.log(req.user);

	 	/*var michy = new admin({
	 		
	 		username : req.body.username,
	 		password : req.body.password
	 	})
	 	michy.save((err) => {
	 		if(err){ return next(new Error("can't save michy"));}
	 	}) */

	 	var customer = new cusModel({
	 		firstname : req.body.firstname,
	 		lastname  : req.body.lastname,
	 		email	  : req.body.email,
	 		account_type : req.body.account_type,
	 		account_balance : req.body.account_balance,
	 		password : req.body.password,
	 		admin    : req.user._id
	 		
	 	});

	 		cusModel.findOne({_id : req.user._id})
	 		.populate('admin', 'username')
	 		.exec(function(err, customer){
	 		    if(err){ return next(new Error("can't execute customer"));}
	 		    //res.status(200).json(customer);
	 				 		
	 				 		}) 		

	 		customer.save((err, data) => {
	 			if(err){ return next(new Error(" can't save customer"));}
	 			var data = data.toObject();
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

	/* exports.FetchAllCustomers = (req, res, next) => {

	 cusModel.find({'account_type' : 'saving'}, 'firstname email admin account_number', function(err, customers){
	 	if(err){ return next(new Error("can't find customers"));}
	 	res.status(200).json(customers);
	 })

	} */

	 exports.FetchOneCustomer = (req, res, next) => {
	 	//console.log(req.params.email);
	 	var email = req.params.email;
	 	cusModel.find({email : email}).then(function(data){
	 		if(!data){ return next(new Error("can't find customer"));}
	 		res.status(200).json(data);
	 		console.log(data);

	 	}, (err) => {return next(err);})
	 }

	

	 exports.FetchAllCustomers = (req, res, next) => {
	 	cusModel.find((err, data) => {
	 		if(err){ return next(new Error("can't fetch all customers"));}
	 		res.status(200).json(data);
	 	})
	 } 

	/* exports.FetchOneCustomer = (req, res, next)=> {
	 	if(!req.customer){return next(new Error("can't find customer"));}
	 	res.status(200).json(req.customer);
	 } */

	 exports.EditCustomer = (req, res, next) => {
	 	var id = req.params.id;
	 	cusModel.findByIdAndUpdate(id, req.body).then((data) => {
	 		if(!data){return next(new Error("can't update customer"));}
	 		res.status(200).json(data);
	 	}, (err)=>{ return next(err);})
	 }

	/* exports.fetchByEmail = (req, res, next) => {
	 	var email = req.params.email;
	 	cusModel.findByEmail(email).then((data) => {
	 		if(!data){ return next(new Error("can't find customer"));}
	 		res.status(200).json(data);
	 	}, (err)=>{ return next(err);})
	 } */