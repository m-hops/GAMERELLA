

class ImageRenderComponent extends RenderComponent{

  constructor(name, img, x=0,y=0,w=null, h=null){
    super(name);
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
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
        image(this.img, this.x, this.y, this.w, this.h);
      } else {
        image(this.img, this.x, this.y);
      }
      pop();
    }
  }
}
