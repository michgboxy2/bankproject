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

		customer.findById(req.user._id).then((transferer)=> {
			if(!transferer){ return next(new Error("can't find customer"));}
			//console.log(transferer);
		
		var account_number = req.params.account_number;
		customer.find({account_number : req.body.recipient}).then(function(details){
			if(!details){ return next(new Error("can't find recipient"));}
			
			for(i =0; i < details.length; i++){
				var recipient = details[0];				
			}
			
			var RecBal = Number(recipient.account_balance);
			var TransfererBal = Number(transferer.account_balance); 
			var amount = Number(req.body.amount);

			if(amount > TransfererBal){ return next(new Error("INSUFFICIENT BALANCE"));

		} else {

			recipient["account_balance"] = (RecBal + amount);
			transferer["account_balance"] = (TransfererBal - amount);

		customer.findByIdAndUpdate(req.user._id, transferer).then((customer) => {
			if(!customer){ return next(new Error("can't update customer"));}
		}) 

		customer.findByIdAndUpdate(recipient._id, recipient).then((receiver) => {
			if(!receiver){ return next(new Error("can't update receiver"));}
		})

		}			
		
		})

		}, (err) => { return next (err);})

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
		})
	}