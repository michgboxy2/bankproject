var transactionModel = 	require("./transaction-model"),
	customer	= 	require("../customer/customer-model.js");
	

	exports.postTransaction = (req, res, next) => {
		transaction = new transactionModel({
			accountname : req.user.firstname,
			amount : req.body.amount,
			recipient : req.body.account_number
		}) 
		
		transaction.save((err, data) => {
			if(err){ return next(new Error("can't save transaction"));}
			res.status(200).json(data);
		})

		transactionModel.findOne(firstname : req.user.firstname)
		.populate('accountname', 'firstname')
		.exec(function(err, transaction){
			if(err){ return next(new Error("can't find recipient"));}
			res.status(200).json(transaction);

		})

	}

	//controller to fetch all transactions from the database
	exports.FetchTransaction = (req, res, next) => {
		transaction.find((err, data)=> {
			if(err){ return next(new Error("can't fetch transaction"));}
			res.status(200).json(data);
		})
	}

	//controller to fetch one transaction from the database
	exports.FetchOneTransaction = (req, res, next) => {
		var id = req.params.id;
		transaction.findById(id).then((data)=> {
			if(!data){ return next(new Error("can't fetch transaction"));}
			res.status(200).json(data);
		}, (err) => { return next(err);})
	}