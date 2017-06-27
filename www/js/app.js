(function(){

	"use strict";

	var getElement = document.getElementById.bind(document),
		regform    = getElement("register"),
		login	   = getElement("Login"),

		xhr = new XMLHttpRequest();

		regform.addEventListener('submit', function(e){
			e.preventDefault();

			var data = "",
				elements = this.elements;
				//make arraylike data inherit array property
			Array.prototype.forEach.call(elements, function(v, i, a){
				data += encodeURIComponent(v.name);
				data += "=";
				data += encodeURIComponent(v.value);
				data += "&";
			})
				//avoid trailing ampersand
			data = data.substring(0, data.length-1);

				//link to the API
			xhr.open("POST", "http://192.168.33.20:3000/api/v1/admin");

			xhr.onreadystatechange = function(){
				handleresponse(xhr);
			};

			xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");

			xhr.send(data);


		}, false);

			function handleresponse(http){
				if(http.readyState == 4){
					if(http.status == 200 || http.status == 304){
						var user = JSON.parse(http.responseText);
						var loginForm = getElement("Login");
						if(user.hasOwnProperty("_token")){
							regform.classList.toggle("hide");
							loginForm.classList.toggle("hide");
						}
					}
				}
			}














}());