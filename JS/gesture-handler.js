/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.013 },
    maxScale: { default: 10 },
	 positionFactor: { default: 5},
  },

  
  //Функция инициализации событий

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);
	 this.handlePosition = this.handlePosition.bind(this);
	 
	


    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
		this.el.sceneEl.addEventListener("threefingermove", this.handlePosition);
		
		
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
		this.el.sceneEl.addEventListener("threefingermove", this.handlePosition);

    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
	 this.el.sceneEl.removeEventListener("threefingermove",this.handlePosition);
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
		
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },

  handlePosition: function(event){
	if(this.isVisible){
		
		this.el.object3D.position.y += event.detail.positionChange.y * this.data.positionFactor ;	
		this.el.object3D.position.x += event.detail.positionChange.x * this.data.positionFactor ;
	}
  }
});
