
class RenderComponent extends GameObjectComponent{
  static ID = 9999;
  constructor(name=null){
    super(name);
  }
  is(flag){
    return flag === RenderComponent.ID;
  }

  applyTransform(){
    this.owner.transform.world.apply();

  }

  draw(renderer){
    //console.log("Draw RenderComponent");
    push();
    this.applyTransform();
    stroke(255, 204, 0);
    noFill();
    //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
    rect(-10, -10, 20, 20)
    pop();
  }
}

class CircleRenderComponent extends RenderComponent{

  constructor(name, radius, w=null, h=null){
    super(name);
    this.radius = radius;
  }
  draw(renderer){
    if(this.enabled){
      //console.log("Draw ImageRenderComponent");
      push();
      this.applyTransform();
      noFill();
      stroke(255,0,0);
      circle(0,0,this.radius*2);
      pop();
    }
  }
}
