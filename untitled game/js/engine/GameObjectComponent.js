
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


  debugDraw(renderer){

  }
}
