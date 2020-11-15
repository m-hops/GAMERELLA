



class GameStart extends Scene{

  constructor(game){
    super();
    this.game = game;
    //this.done = false;
  }
  onSetup(){


  }
  onUpdate(){
    // if(!this.done){
    //   this.done = true;
    //   this.game.moveToNextGame();
    // }
    this.game.moveToNextGame();
  }



}
