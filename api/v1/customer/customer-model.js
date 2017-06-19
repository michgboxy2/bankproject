var mongoose	= require("mongoose"),
	bcrypt		= require("bcrypt-nodejs"),
	customerSchema;

	mongoose.connect("mongodb://localhost/admin");

	customerSchema = new mongoose.Schema({
		firstname :{type: String, required: true},
		lastname : {type: String, required: true},
		email : {type: String, required: true, unique : true},
		account_type : {type: String, enum : ['saving', 'current', 'fixed-deposit',], required : true},
		account_number : {type: Number, default : Math.floor(Math.random() * (9999999999))},
		account_balance : {type : Number, required : true},
		password : {type : String, required : true},
		//admin : {type: String, required : true}
		admin : [{type: mongoose.Schema.Types.ObjectId, ref: 'admin'}],
	});

	customerSchema.pre('save', function(next){
		//customerSchema.find({}).populate('admin').exec(callback);

		this.password = this.encryptPassword(this.password);
		next();
	});



	customerSchema.methods = {
		authenticate : function(plaintext){
			return bcrypt.compareSync(plaintext, this.password);
		},

		encryptPassword : (plaintext) => {
			if(!plaintext){ return next(new Error("invalid email or passsword"));}
			var salt = bcrypt.genSaltSync();
			return bcrypt.hashSync(plaintext, salt);
		}
	}

	module.exports = mongoose.model("customer", customerSchema);