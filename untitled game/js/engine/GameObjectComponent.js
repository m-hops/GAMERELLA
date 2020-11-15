
class GameObjectComponent extends BaseObject{

  constructor(name= null){
    super();
    this.owner = null;
    this.name = name;
    this.enabled = true;
  }

  getTransform(){
    return this.owner.transform;
  }
  getPosition(){
    return this.getTransform().world.position;
  }
  vectorTo(other){
    return p5.Vector.sub(other.getTransform().world.position , this.getTransform().world.position);
  }
  distTo(other){
    return p5.Vector.sub(other.getTransform().world.position , this.getTransform().world.position).mag();
  }
  getScene(){
    return this.owner.scene;
  }
  setOwner(owner){
    this.owner = owner;
  }
  onActivate(){

  }
  onDeactivate(){

  }


  run(){

  }


  onDispose(){

  }
  debugDraw(renderer){

  }
}
