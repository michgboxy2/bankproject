var	adminModel 	= require("./admin-model.js"),
	auth		= require("../auth/auth.js");


	exports.InterceptId = (req, res,next,id) => {
		var id = req.params.id;

		adminModel.findById(id).then((data) => {
			if(!data){ return next(new Error("can't find Id"));}

			req.admin = data;
			next();

		})
	}

	//register admin 
	exports.RegisterAdmin = (req, res, next) =>{
		var admin = req.body,
			adminObj = new adminModel(admin);

			adminObj.save((data) => {
				if(!data){ return next(new Error("can't save admin"));}
				res.status(200).json(data);
			});
	}

	//get admin by Id
	exports.FetchAllAdmin = (req, res, next) => {
			if(!req.admin){return next(new Error("can't fetch admins"));}
			res.status(200).json(req.body);

	}
	//delete admin
	exports.RemoveAdmin = (req, res, next) => {
		adminModel.findByIdAndRemove(id).then((data) => {
			if(!data){ return next(new Error("can't delete admin"));}
			res.status(200).json(data);
		})
	}

	exports.FetchAdminById = (req, res, next) => {
		adminModel.findById(id).then((data) => {
			if(!data){ return next(new Error("can't fetch addmin"));}
			res.status(200).json(data);
		})
	} 

	exports.EditAdmin = (req, res, next) => {
			var id = req.params.id;

			adminModel.findByIdAndUpdate(id, req.body).then((data) => {
				if(!data){ return next(new Error("can't update admin"));}
				res.status(200).json(data);
			})
	}

