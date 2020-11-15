
class ResultMsgObject extends GameObject{
  constructor(){
    super(null,"Timer");
    this.time = 2000;
    this.timerActive = false;
    this.success = false;
    this.nextScene = null;
  }
  run(){
    if(this.timerActive){
      this.time -= deltaTime;
      if(this.time < 0){
        if(this.nextScene != null){
          Engine.setScene(this.nextScene);
        }
      }
    }
  }
  setFail(){
    console.log("Failed!!!!!");
    this.success = false;
    this.startTimer();
  }
  setSuccess(){
    console.log("Success!!!!!");
    this.success = true;
    this.startTimer();
  }
  startTimer(){
    this.timerActive = true;
  }
  isTimerActive(){
    return this.timerActive;
  }
}
