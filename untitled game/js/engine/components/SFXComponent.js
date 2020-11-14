
class SFXComponent extends GameObjectComponent{
  static ID = 102;
  constructor(sfx, owner=null){
    super(owner);
    this.owner = owner;
    this.sfx = sfx;
  }
  is(flag){
    return flag === SFXComponent.ID;
  }
  onActivate(){
    this.play();
  }
  onDeactivate(){
    this.stop();
  }
  play(){
    this.sfx.play();
  }
  loop(){
    this.sfx.loop();
  }
  stop(){
    this.sfx.stop();
  }
}
