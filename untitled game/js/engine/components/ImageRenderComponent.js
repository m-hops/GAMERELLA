

class ImageRenderComponent extends RenderComponent{

  constructor(name, img, x=0,y=0,w=null, h=null){
    super(name);
    if(w == null){
      this.bound = AABB.MakeTopLeftSize(x,y,0,0);
    } else {
      this.bound = AABB.MakeTopLeftSize(x,y,w,h);
    }
    //this.w = w;
    //this.h = h;
    //this.x = x;
    //this.y = y;
    this.img = img;
  }
  draw(renderer){
    if(this.enabled){
      //console.log("Draw ImageRenderComponent");
      push();
      this.applyTransform();
      //tint(255,255,255,127);
      //stroke(255, 204, 0);
      //noFill();
      //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
      //rect(0, 0, this.w, this.h);
      let area = this.bound.getArea();
      var p = this.bound.getMin();

      if(area > 0){
        var s = this.bound.getSize();
        image(this.img, p.x, p.y, s.x, s.y);
      } else {
        image(this.img, p.x, p.y);
      }
      pop();
    }
  }
}
