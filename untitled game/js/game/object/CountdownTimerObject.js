class CountdownTimerComponent extends GameObjectComponent{

  constructor(){
    super("CountdownTimerComponent");
    this.time = 10000;

  }

  run(){
    if(this.enabled){
      this.time -= deltaTime;
      if(this.time<0){
        this.time = 0;
      }
      let textComp = this.owner.getFirstComponentByName("text");
      if(textComp != null){
        let ms = abs(floor((this.time % 1000)/10));
        let sec = floor(this.time / 1000);
        if(sec < 10){
          sec = "0" + sec;
        }
        if(ms < 10){
          ms = "0" + ms;
        }
        textComp.text = "" + sec + ":" + ms;
      }
    }

  }

}
class CountdownTimerObject extends GameObject{
  constructor(){
    super(null,"Timer");

    this.timerComp = this.addComponent(new CountdownTimerComponent());
    let timerText = this.addComponent(new TextRenderComponent("text","00:00", color(255,0,0), "arial"));
    timerText.size = 64;
  }
  isOver(){
    return this.timerComp.time <= 0;
  }
}
