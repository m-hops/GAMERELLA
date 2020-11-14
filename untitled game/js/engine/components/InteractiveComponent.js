
class InteractiveComponent extends GameObjectComponent{
  static ID = 101;
  constructor(target, onClick, owner=null){
    super(owner);
    this.owner = owner;
    this.target = target;
    this.onClick = onClick;
  }
  is(flag){
    return flag === InteractiveComponent.ID;
  }
  processMouseClick(posLocal, posWorld, event){
    //console.log(event);
    if(this.onClick != null){
      this.onClick.apply(this.target, [posLocal, posWorld, event]);
    }
    return false;
  }
}
