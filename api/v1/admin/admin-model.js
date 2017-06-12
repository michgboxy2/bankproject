var  mongoose 	= require("mongoose"),
	 bcrypt		= require("bcrypt-nodejs"),
	 AdminSchema;

	 mongoose.connect("mongodb://localhost/admin");

	 AdminSchema = new mongoose.Schema({
	 	username : {type : String, required : true, unique: true},
	 	password : {tpe: String, required: true},
	 	date : {type: Date, default: Date.now}
	 });


	 AdminSchema.pre('save', function(next){
	 	this.password = this.encryptPassword(this.password);
	 	next();
	 })

	 //method to authenticate user
	 AdminSchema.methods = {
	 	authenticate : (plaintext) => {
	 		return bcrypt.compareSync(plaintext, this.password);
	 	},

	 	encryptPassword : (plaintext){
	 		if(!plaintext){ return next(new Error("please enter your password"));}
	 		var salt = bcrypt.gensaltSync();
	 		return bcrypt.hashSync(plaintext, salt);
	 	}

	 }

	 