
class SampleScene extends Scene{
  static background=0;
  static testSFX;
  static onPreload(){
    SampleScene.background = loadImage('assets/images/1. start/startSplash.png');
    SampleScene.testSFX = loadSound('assets/sounds/menuTheme.mp3')
  }

  constructor(){
    super();
  }
  onSetup(){
    SceneUtil.addImage(this, MainMenu.background, 100,100, 0, 500, 200); // z at 0 will draw between -1 and 1
    SceneUtil.addImage(this, MainMenu.background, 150,150, 1, 500, 200); // z at 1 will draw on top
    SceneUtil.addImage(this, MainMenu.background, 50,200, -1, 500, 200); // z at -1 will draw bellow


    this.myButton = SceneUtil.addImage(this, MainMenu.background, 800,400, 1, 200, 120); // z at -1 will draw bellow
    SceneUtil.addRectCollisionToObject(this.myButton, 0,0,200,120);
    SceneUtil.addButtonToObject(this.myButton, this, this.onButtonClick);

    this.mySFX = SceneUtil.addSFX(this, SampleScene.testSFX, false);

  }
  onButtonClick(posLocal, posWorld, event){
    console.log(event);
    if(this.mySFX.enabled){
      this.mySFX.deactivate();
    } else {
      this.mySFX.activate();
    }
  }
  onUpdate(){

  }

  onDraw(renderer){

  }
}
