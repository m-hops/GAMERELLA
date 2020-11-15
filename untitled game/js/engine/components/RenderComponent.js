
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
    this.owner.transform.world.apply();
    stroke(255, 204, 0);
    noFill();
    //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
    rect(-10, -10, 20, 20)
    pop();
  }
}
