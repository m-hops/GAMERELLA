
class InteractiveComponent extends GameObjectComponent{
  static ID = 101;
  constructor(name, target, onClick, onPressed=null, onReleased=null){
    super(name);
    this.target = target;
    this.onClick = onClick;
    this.onPressed = onPressed;
    this.onReleased = onReleased;
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
  processMousePressed(posLocal, posWorld, event){
    if(this.onPressed != null){
      return this.onPressed.apply(this.target, [posLocal, posWorld, event]);
    }
    return false;
  }
  processMouseReleased(posLocal, posWorld, event){
    if(this.onReleased != null){
      return this.onReleased.apply(this.target, [posLocal, posWorld, event]);
    }
    return false;
  }
}
