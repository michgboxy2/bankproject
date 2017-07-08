(function(){

	"use strict";
	var getElement = document.getElementById.bind(document),

	 loginform = getElement("login"),

				xhr = new XMLHttpRequest();

				//console.log(loginform);

				loginform.addEventListener('submit', function(e){
					e.preventDefault();

					var data = {},
					elements = this.elements;
					
					//foreach loop of the arraylike object
					Array.prototype.forEach.call(elements, function(v,i,a){
						//avoid trailing ampersand
						data[encodeURIComponent(v.name)] = encodeURIComponent(v.value);
					

						xhr.open("POST", "http://192.168.33.20:3000/api/v1/customerauth");
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
										window.location = "homepage.html";


									}
								}
							}
						}

}());