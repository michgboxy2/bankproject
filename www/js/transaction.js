(function(){

var getElement = document.getElementById.bind(document),
	transact   = document.getElementById("transact"),

	xhr = new XMLHttpRequest();

	transact.addEventListener('submit', function(e){
		e.preventDefault();
		var data = "",
		element = this.elements;

	
	Array.prototype.forEach.call(element, function(v,i,a){
		
		data += encodeURIComponent(v.name);
		data += "=";
		data += encodeURIComponent(v.value);
		data += "&";
		})

		data = data.substring(0, data.length-1);

		xhr.open("POST", "http://192.168.33.20:3000/api/v1/transaction");
		xhr.onreadystatechange = function(){
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
			var list = document.getElementById("list");
			var view = document.getElementById('view');
			var transact = document.getElementById('transact');
			if(user.hasOwnProperty("_id")){
				transact.reset();

					}
				}
			}
		}




	

	





















}());