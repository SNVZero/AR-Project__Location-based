var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		 sURLVariables = sPageURL.split('&'),
		 sParameterName,
		 i;

	for (i = 0; i < sURLVariables.length; i++) {
		 sParameterName = sURLVariables[i].split('=');

		 if (sParameterName[0] === sParam) {
			  return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		 }
	}
	return false;
};
var modelName = getUrlParameter('card');
document.addEventListener("DOMContentLoaded", () => {
	if (modelName == 'car'){
		let model = document.querySelector('a-entity');
		model.setAttribute('gltf-model','../assets/objCar/scene.gltf')
		model.setAttribute('scale','0.1 0.1 0.1')
		model.setAttribute('rotation','-90 0 0')
	}else if(modelName == 'monk'){
		let model = document.querySelector('a-entity');
		model.setAttribute('gltf-model','../assets/objMonk/scene.gltf')
		model.setAttribute('scale','1.5 1.5 1.5')
		model.setAttribute('rotation','-90 0 0')
	}else if(modelName == 'mounth'){
		let model = document.querySelector('a-entity');
		model.setAttribute('gltf-model','../assets/objMounth/scene.gltf')
		model.setAttribute('scale','2 2 2')
		model.setAttribute('rotation','-90 0 0')
	}
	
});