
(function(){

	"use strict";


	var getElement = document.getElementById.bind(document),

	    Register =   getElement('add-contact'),

	    xhr = new XMLHttpRequest();

	    Register.addEventListener('submit', function(e){
	    	e.preventDefault();

	    	var data = "",
	    		element = this.elements;

	    		Array.prototype.forEach.call(elements, function(v,i,a){
	    			data+= encodeURIComponent(v.name);
	    			data+= "_";
	    			data+= encodeURIComponent(v.value);
	    			data+="&";
	    		})
	    		// avoid trailing ampersand
	    		data = data.substring(0, data.length-1);

	    		//link form with the API
	    		xhr.open("POST", "http://192.168.33.20:3000/api/v1/admin")
	    		xhr.onreadystatechange = function(){
	    			handleresponse(xhr);
	    		};

	    		xhr.setRequestHeader("Content-Type", "x-www-form-urlencoded");

	    		xhr.send(data);
	    }, false);

	    		function handleresponse(http){
	    			if(http.readyState == 4){
	    				if(http.status == 200 || http.status == 304){
	    					var user = JSON.parse(http.responseText);
	    					var login = getElement("Login");

	    					if(user.hasownproperty(_token)){
	    						Register.classList.toggle("hide");
	    					     login.classList.toggle("hide");
	    					}
	    				}

	    			}
	    		}





















}());