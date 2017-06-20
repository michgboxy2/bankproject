var	 express = 		require("express"),
	 router	 =		express.Router(),
	 auth	 = 		require("../auth/cus-auth.js"),
	 controller =   require("./transaction-controller.js");

	 router.route("/")
	 .post(auth.decodeToken, controller.postTransaction)
	 .get(auth.decodeToken, controller.FetchTransaction);

	 router.route("/:id")
	 .get(auth.decodeToken, controller.FetchOneTransaction);

	 module.exports = router;