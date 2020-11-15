
class SFXComponent extends GameObjectComponent{
  static ID = 102;
  constructor(name=null, sfx){
    super(name);
    this.sfx = sfx;
    this.rate = 1;
  }
  is(flag){
    return flag === SFXComponent.ID;
  }
  onActivate(){
    this.loop();
  }
  onDeactivate(){
    this.stop();
  }
  onDispose(){
    this.stop();
  }
  play(){
    this.sfx.rate(this.rate);
    this.sfx.play();
  }
  loop(){
    this.sfx.rate(this.rate);
    this.sfx.loop();
  }
  stop(){
    this.sfx.stop();
  }
}
