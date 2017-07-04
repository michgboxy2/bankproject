var transactionModel = 	require("./transaction-model"),
	customer	= 	require("../customer/customer-model.js");
	

	exports.postTransaction = (req, res, next) => {
		transaction = new transactionModel({
			accountname : req.user._id,
			amount : req.body.amount,
			recipient : req.body.recipient
		})

		transactionModel.findOne({_id : req.user._id})
		.populate('accountname', 'firstname')
		.exec(function(err, transaction){
			if(err){ return next(new Error("can't find recipient"));}
			//res.status(200).json(transaction);

		})





		customer.findById(req.user._id).then((data) => {
			if(!data){return next(new Error("can't find customer"));}
			
				data = data.toObject();

			var balance = data.account_balance,
				amount  = req.body.amount,
				
				total   = (balance - amount);

				data["account_balance"] = total;


				customer.findByIdAndUpdate(req.user._id, data).then((customers) => {
					if(!customers){ return next(new Error("can't update"));}

					console.log(customers);				
					
				}, (err) => { return next(err);})

				
				

			

						
	
		}, (err) => { return next(err);})
		





















		



		
		transaction.save((err, data) => {
			if(err){ return next(new Error("can't save transaction"));}
			res.status(200).json(data);
		})

		

	}

	//controller to fetch all transactions from the database
	exports.FetchTransaction = (req, res, next) => {
		transactionModel.find((err, data)=> {
			if(err){ return next(new Error("can't fetch transaction"));}
			res.status(200).json(data);
		})
	}

	//controller to fetch one transaction from the database
	exports.FetchOneTransaction = (req, res, next) => {
		var id = req.params.id;
		transactionModel.findById(id).then((data)=> {
			if(!data){ return next(new Error("can't fetch transaction"));}
			res.status(200).json(data);
		}, (err) => { return next(err);})
	}