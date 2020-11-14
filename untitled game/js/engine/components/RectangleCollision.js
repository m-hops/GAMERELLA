
class RectangleCollision extends CollisionComponent{

  constructor(x,y,w,h, owner=null){
    super(owner);
    this.aabb = new AABB(x+w/2,y+h/2,w/2,h/2);
  }
  is(flag){
    if(super.is(flag)) return true;
    return flag === RenderComponent.ID;
    return false;
  }
  isLocalPointIn(point){
    return this.aabb.isPointIn(point);
  }

  draw(renderer){
    //console.log("Draw RenderComponent");
    push();
    this.owner.transform.world.apply();
    stroke(255, 255, 0);
    noFill();
    //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
    let boxMin = this.aabb.getMin();
    let boxSize = this.aabb.getSize();
    rect(boxMin.x, boxMin.y, boxSize.x, boxSize.y);
    pop();
  }
}
