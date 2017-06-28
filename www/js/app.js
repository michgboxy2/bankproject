(function(){

	"use strict";

	var getElement = document.getElementById.bind(document),
		regform    = getElement("register"),
		login	   = getElement("Login"),
		log 	   = getElement("Log"),

		xhr = new XMLHttpRequest();
		log.addEventListener('click', function(e){
			e.preventDefault();
			log.classList.toggle("hide");
			login.classList.toggle("hide");
		}, false);

		regform.addEventListener('submit', function(e){
			e.preventDefault();

			var data = "",
				elements = this.elements;
				//console.log(elements);
				
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
			}
				//set Request header
			xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");

			xhr.send(data);


		}, false);

				//Response handler
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


			var loginform = getElement("Login"),
				xhr = new XMLHttpRequest();

				loginform.addEventListener('submit', function(e){
					e.preventDefault();

					var data = {},
					elements = this.elements;
					console.log(elements);
					//foreach loop of the arraylike object
					Array.prototype.forEach.call(elements, function(v,i,a){
						//avoid trailing ampersand
						data[encodeURIComponent(v.name)] = encodeURIComponent(v.value);
						console.log(data);

						xhr.open("POST", "http://192.168.33.20:3000/api/v1/auth");
						xhr.onreadystatechange = function(){
							handleLogin(xhr);
						}

						xhr.setRequestHeader("Content-Type", "Application/json");

						xhr.send(JSON.stringify(data));

					})

				},false);

						function handleLogin(http){
							if(http.readyState == 4){
								if(http.status == 200 || http.status == 304){
									var user = JSON.parse(http.responseText);
									if(user.hasOwnProperty("_token")){
										localStorage.setItem("token", user._token);
										window.location = "dashboard.html";


									}
								}
							}
						}

}());