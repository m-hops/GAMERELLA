
class CollisionComponent extends GameObjectComponent{
  static ID = 100;
  constructor(owner=null){
    super(owner);
    this.owner = owner;
  }
  is(flag){
    return flag === CollisionComponent.ID;
  }
  isLocalPointIn(point){
    return false;
  }
}
