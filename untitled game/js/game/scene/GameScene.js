



class GameScene extends Scene{

  constructor(callbackObj=null, callbackFunc=null){
    super();
    this.callbackObj = callbackObj;
    this.callbackFunc = callbackFunc;
  }
  onSetup(){



    this.timerObject = new CountdownTimerObject();
    this.timerObject.setPosition(800,150,5);
    this.addGameObject(this.timerObject);

    this.resultMsgObject = new ResultMsgObject(this.callbackObj, this.callbackFunc);
    this.resultMsgObject.setPosition(width*0.5,height*0.5,5);
    this.addGameObject(this.resultMsgObject);
  }

  isWinningCondition(){
    return false;
  }
  onUpdate(){

    if(!this.resultMsgObject.isTimerActive()){
      if(this.timerObject.isOver()){
        // timer is over
        if(this.isWinningCondition()){
          this.resultMsgObject.setSuccess();
        } else {
          this.resultMsgObject.setFail();
        }
      } else if(this.timerObject.enabled && this.isWinningCondition()){
        // we have a winning condition
        // timer is not over and still counting down
        this.timerObject.stopTimer();
        this.resultMsgObject.setSuccess();
      }
    }

  }



}
