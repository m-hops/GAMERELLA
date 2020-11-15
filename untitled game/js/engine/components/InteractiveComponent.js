
class InteractiveComponent extends GameObjectComponent{
  static ID = 101;
  constructor(name, target, onClick){
    super(name);
    this.target = target;
    this.onClick = onClick;
  }
  is(flag){
    return flag === InteractiveComponent.ID;
  }
  processMouseClick(posLocal, posWorld, event){
    //console.log(event);
    if(this.onClick != null){
      return this.onClick.apply(this.target, [posLocal, posWorld, event]);
    }
    return false;
  }
}
