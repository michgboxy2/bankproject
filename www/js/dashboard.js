(function(){

	"use strict";
	var getElement = document.getElementById.bind(document),

		 regform =	 getElement("register"),
		 view 	 =   getElement("view"),
		 viewpage =  getElement("viewpage"),
		 list     =  getElement("list");

		 console.log(list);
		 


		 var xhr 	=	new XMLHttpRequest();

		 viewpage.addEventListener('click', function(e){
		 	e.preventDefault();

		 	regform.classList.toggle("hide");
		 	view.classList.toggle("hide");



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
		 					//console.log(user);
		 					
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
		 		

		 		
		 		var url = "http://192.168.33.20:3000/api/v1/customer/"+ String(email.value);
		 		console.log(url);
		 		xhr.open("GET", url);
		 		xhr.onreadystatechage = function(){
		 			handleview(xhr);
		 		}

		 		//xhr.setRequestHeader("Content-Type", "Application/json");
		 		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

		 		xhr.send(null);

		 	}, false);


		 		function handleview(http){
		 			if(http.readyState == 4){
		 				if(http.status == 200 || http.status == 304){
		 					var user = JSON.parse(http.responseText);
		 						user.forEach(function(user){
		 							var list = document.getElementById('list'),
		 								li = document.createElement("li"),
		 								H = document.createElement("h3");
		 								H.innerText = user.firstname;
		 								H.innerText = user.lastname;
		 								H.innerText = user.email;
		 								H.innerText = user.account_number;
		 								H.innerText = user.account_type;
		 								H.innerText = user.account_balance;
		 							var	br = document.createElement("br");
		 								li.appendChild(H);
		 								li.appendChild(br);
		 								list.appendChild(li);
		 					})


		 				}
		 			}
		 		}



}());