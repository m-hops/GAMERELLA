
class GameObjectComponent extends BaseObject{

  constructor(owner = null){
    super();
    this.owner = owner;
  }

  getTransform(){
    return this.owner.transform;
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
