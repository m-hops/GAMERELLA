
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

  mult(value){
    this.center.mult(value);
    this.extent.mult(value);
  }
  add(value){
    this.center.add(value);
  }
  sub(value){
    this.center.sub(value);
  }

  multed(value){
    return new AABB(p5.Vector.mult(this.center, value),
      p5.Vector.mult(this.extent, value));
  }
  multed(x,y){
    return new AABB(p5.Vector.mult(this.center, createVector(x,y)),
      p5.Vector.mult(this.extent, value));
  }
  added(value){
    return new AABB(p5.Vector.add(this.center, value), this.extent);
  }
  subed(value){
    return new AABB(p5.Vector.sub(this.center, value), this.extent);
  }
  getArea(){
    return this.extent.x * this.extent.y;
  }

  static MakeTopLeftSize(x,y,w,h){
    return new AABB(x+w/2, y+h/2,w/2,h/2);
  }

  static MakeCenterExtent(vecCenter, vecExtent){
    let aabb = new AABB();
    aabb.center = vecCenter.copy();
    aabb.extent = vecExtent.copy();
    return aabb;
  }

}
