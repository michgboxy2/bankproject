var express  = require("express"),
	router   = express.Router(),
	auth  	 = require("../auth/auth.js"),
	control	 = require("../auth/auth-controller.js"),
	controller = require("./customer-controller.js");


	//mounting the controller that intercept IDs
	router.param("id", controller.InterceptId);


	//mounting the controller that register customer and the one that fetches all customer to their respective rout.
	router.route("/")
	.post(auth.decodeToken, controller.RegisterCustomer)
	.get(auth.decodeToken, controller.FetchAllCustomers);

	router.route("/:email")
	.get(auth.decodeToken, controller.FetchOneCustomer);




	//mounting the delete, fetch and update controllers that requires an id;
	router.route("/:id")
	.delete(auth.decodeToken, controller.RemoveCustomer)
	//.get(auth.decodeToken, controller.FetchOneCustomer)
	.put(auth.decodeToken, controller.EditCustomer); 

	module.exports = router;