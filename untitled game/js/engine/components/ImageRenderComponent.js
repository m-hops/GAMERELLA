

class ImageRenderComponent extends RenderComponent{

  constructor(name, img, w=null, h=null){
    super(name);
    this.w = w;
    this.h = h;
    this.img = img;
  }
  draw(renderer){
    if(this.enabled){
      //console.log("Draw ImageRenderComponent");
      push();
      this.applyTransform();
      //stroke(255, 204, 0);
      //noFill();
      //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
      //rect(0, 0, this.w, this.h);
      if(this.w != null){
        image(this.img, 0, 0, this.w, this.h);
      } else {
        image(this.img, 0, 0);
      }
      pop();
    }
  }
}
