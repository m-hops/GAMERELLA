
class Game{
  static ImgSuccess;
  static ImgFail;
  static instance;
  static onPreload(){

    Game.ImgFail = loadImage('assets/images/generalAssets/FAILURE.png');
    Game.ImgSuccess = loadImage('assets/images/generalAssets/GOOD.png');
  }
  constructor(){
    Game.instance = this;

    this.gameSequence = [];
    this.gameSequence.push(new CookingConfig());
    this.gameSequence.push(new ConvoConfig());
    this.currentGameIndex = 0;
    this.currentGameScene = null;

  }
  reset(){

    this.currentGameIndex = 0;
    this.currentGameScene = null;
  }
  start(){
    Engine.setScene(new Introduction(this));
    //this.moveToNextGame();
    //Engine.setScene(new Convo(this));
  }
  moveToNextGame(){
    if(this.currentGameIndex == this.gameSequence.length){
      Engine.setScene(new Ending());
    } else {
      console.log("Move to next game (index=" + this.currentGameIndex + ")");
      console.log(this.gameSequence[this.currentGameIndex]);
      this.currentGameScene = this.gameSequence[this.currentGameIndex].createScene(this);
      Engine.setScene(this.currentGameScene);
      ++this.currentGameIndex;
    }


    // let index = (this.lastGame+1)%2;
    // //let index = floor(random(0,2));
    // console.log("moveToNextGame " + index);
    // this.setNextGameByIndex(index);
    // this.lastGame = index;
  }
  // setNextGameByIndex(index){
  //   if(this.gameCount >= 6){
  //
  //     Engine.setScene(new Ending());
  //   } else {
  //     ++this.gameCount;
  //
  //     switch(index){
  //       case 0:
  //         ++this.cookingIteration;
  //         Engine.setScene(new CookingIntro());
  //         break;
  //       case 1:
  //         ++this.convoIteration;
  //         Engine.setScene(new ConvoIntro());
  //         break;
  //     }
  //   }
  // }
}
