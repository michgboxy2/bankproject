(function(){

	"use strict";
	var getElement = document.getElementById.bind(document),

		 regform =	 getElement("register"),

		 xhr 	=	new XMLHttpRequest();

		 regform.addEventListener('submit', function(e){
		 	e.preventDefault();

		 	var data = "",

		 	elements = this.elements;
		 	console.log(elements);

		 	
		 	Array.prototype.forEach.call(elements, function(v,i,a){
		 		data += encodeURIComponent(v.name);
		 		data += "=";
		 		data += encodeURIComponent(v.value);
		 		data += "&";
		 	})

		 	data = data.substring(0, data.length-1);

		 	xhr.open("POST", "http://192.168.33.20:3000/api/v1/customer");

		 	xhr.onreadystatechage = function(){
		 		handleresponse(xhr);
		 	}

		 	xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");
		 	xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

		 	xhr.send(data);
		 	console.log(data);

		 }, false);


		 	function handleresponse(http){
		 		if(http.readyState == 4){
		 			if(http.status == 200 || http.status == 304){
		 				var user = JSON.parse(http.responseText);

		 				var view = getElement("view");
		 				if(user.hasOwnProperty("_token")){
		 					console.log(user);
		 					view.classList.toggle("hide");
		 					regform.classList.toggle("add");
		 				}
		 			}
		 		}
		 	}

























}());