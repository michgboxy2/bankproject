var mongoose = 	require("mongoose"),
	transactionSchema;

	//connect the model to the database
	mongoose.connect("mongodb:localhost/admin");

	transactionSchema = new mongoose.Schema({
		accountname : {type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
		amount		: {type: Number, required : true},
		recipient	: {type: Number, required: true},
		date 		: {type : Date, default : Date.now}
	});


	module.exports = mongoose.model('transaction', transactionSchema);
