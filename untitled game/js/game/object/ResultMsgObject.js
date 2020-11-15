
class ResultMsgObject extends GameObject{
  constructor(callbackObj, callbackFunc){
    super(null,"Timer");
    this.time = 2000;
    this.timerActive = false;
    this.success = false;
    //this.nextScene = null;
    this.callbackObj = callbackObj;
    this.callbackFunc = callbackFunc;

    this.imgSuccess = this.addComponent(new ImageRenderComponent("imgSuccess", Game.ImgSuccess, -Game.ImgSuccess.width*0.5, -Game.ImgSuccess.height*0.5));
    this.imgFail = this.addComponent(new ImageRenderComponent("imgFail", Game.ImgFail, -Game.ImgFail.width*0.5, -Game.ImgFail.height*0.5));
    this.imgSuccess.enabled = false;
    this.imgFail.enabled = false;
  }
  run(){
    if(this.timerActive){
      this.time -= deltaTime;
      //console.log("ResultMsgObject " + this.time);
      if(this.time < 0){
        if(this.callbackFunc != null){
          if(this.callbackObj != null){
            this.callbackFunc.apply(this.callbackObj);
          } else {
            this.callbackFunc();
          }
        } else {
          console.log("ResultMsgObject has no callback set");
        }
      }
    }
  }
  setFail(){
    this.imgSuccess.enabled = false;
    this.imgFail.enabled = true;
    console.log("Failed!!!!!");
    this.success = false;
    this.startTimer();
  }
  setSuccess(){
    this.imgSuccess.enabled = true;
    this.imgFail.enabled = false;
    console.log("Success!!!!!");
    this.success = true;
    this.startTimer();
  }
  startTimer(){
    this.timerActive = true;
    this.time = 2000;
  }
  isTimerActive(){
    return this.timerActive;
  }
}
