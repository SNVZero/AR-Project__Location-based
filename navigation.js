document.addEventListener("DOMContentLoaded", () => {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
			function (position){
				SetUserPosition(position.coords.latitude,position.coords.longitude);
			},
			function(error){
				alert(error.code)
				alert(error.message)
			}
		)
		navigator.geolocation.watchPosition(
			function(position){
				SetUserPosition(position.coords.latitude,position.coords.longitude)
			}
		)
	}else{
		alert("Нет доступа к геоданным")
	}

	function SetUserPosition(latitude,longitude){
		let model = document.querySelector('a-entity');
		model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
		console.log(model.getAttribute("gps-entity-place"))
	}

	
});