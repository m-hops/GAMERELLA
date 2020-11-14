
class AABB{

  constructor(cx,cy,ex,ey){
    this.center = new p5.Vector(cx,cy,0);
    this.extent = new p5.Vector(ex,ex,0);
  }
  isPointIn(point){
    let relative = p5.Vector.sub(point, this.center);
    return abs(relative.x) < this.extent.x && abs(relative.y) < this.extent.y;
  }
  getMin(){
    return new p5.Vector(this.center.x-this.extent.x, this.center.y-this.extent.y,0);
  }
  getMax(){
    return new p5.Vector(this.center.x+this.extent.x, this.center.y+this.extent.y,0);
  }
  getSize(){
    return new p5.Vector(this.extent.x*2, this.extent.y*2,0);
  }
}
