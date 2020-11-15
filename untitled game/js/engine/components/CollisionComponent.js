
class CollisionComponent extends GameObjectComponent{
  static ID = 100;
  constructor(name=null){
    super(name);
  }
  is(flag){
    return flag === CollisionComponent.ID;
  }
  isLocalPointIn(point){
    return false;
  }
}
