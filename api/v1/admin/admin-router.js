var  express = 	require("express"),
	 router  =  express.Router(),
	 controller = require("./admin-router");


	 router.param("id,controller.interceptId");


	 router.route("/")
	 .post(controller.RegisterAdmin)
	 .get(controller.FetchAllAdmin);

	 rouder.route("/:id")
	 .delete(controller.RemoveAdmin)
	 .put(controller.EditAdmin)
	 .get(controller.FetchAdminById);