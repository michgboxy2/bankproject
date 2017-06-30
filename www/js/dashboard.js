(function(){

	"use strict";
	var getElement = document.getElementById.bind(document),

		 regform =	 getElement("register"),
		 view 	 =   getElement("view"),
		 viewpage =  getElement("viewpage");

		 console.log(view);
		 


		 var xhr 	=	new XMLHttpRequest();

		 viewpage.addEventListener('click', function(e){
		 	e.preventDefault();

		 	view.classList.toggle("hide");
		 	viewpage.classList.toggle("hide");



		 }, false);






		 regform.addEventListener('submit', function(e){
		 	e.preventDefault();

		 	var data = "",

		 	elements = this.elements;
		 	

		 	
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
		 	

		 }, false);


		 	function handleresponse(http){
		 		if(http.readyState == 4){
		 			if(http.status == 200 || http.status == 304){
		 				var user = JSON.parse(http.responseText);
		 				console.log(user);

		 				var view = getElement("view");
		 				if(user.hasOwnProperty("_token")){
		 					console.log(user);
		 					
		 					regform.classList.toggle("add");
		 					view.classList.toggle("hide");
		 				}
		 			}
		 		}
		 	}



		 	view.addEventListener('submit', function(e){
		 		e.preventDefault();

		 		var data = "",
		 		email = getElement("email");
		 		

		 		

		 		xhr.open("GET", "http://192.168.33.20:3000/api/v1/customer/"+email.value);
		 		xhr.onreadystatechage = function(){
		 			handleview(xhr);
		 		}

		 		xhr.setRequestHeader("Content-Type", "Application/json");
		 		xhr.setRequestHeader("Content-Type", "Bearer" + localStorage.getItem("token"));

		 		xhr.send();

		 	}, false);


		 		function handleview(http){
		 			if(http.readyState == 4){
		 				if(http.status == 200 || http.status == 304){
		 					var user = JSON.parse(http.responseText);

		 					console.log(http.responseText);

		 					var viewcus = getElement("list");
		 					viewcus.innerHTML = http.responseText;



		 							 				


		 				}
		 			}
		 		}

























}());