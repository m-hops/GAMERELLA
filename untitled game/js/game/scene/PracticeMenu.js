class PracticeMenu extends Scene{
  static background;
  static border;
  static convo;
  static cooking;
  static driving;
  static sightseeing;
  static text;

  static onPreload(){
    PracticeMenu.background = loadImage('assets/images/4. practice selection/BKG.png');
    PracticeMenu.border = loadImage('assets/images/4. practice selection/border.png');
    PracticeMenu.convo = loadImage('assets/images/4. practice selection/convoBTN.png');
    PracticeMenu.cooking = loadImage('assets/images/4. practice selection/cookingBTN.png');
    PracticeMenu.driving = loadImage('assets/images/4. practice selection/drivingBTN.png');
    PracticeMenu.sightseeing = loadImage('assets/images/4. practice selection/sightseeingBTN.png');
    PracticeMenu.text = loadImage('assets/images/4. practice selection/sideText.png');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    SceneUtil.addImage(this, "", PracticeMenu.background, 0,0,-1);
    SceneUtil.addImage(this, "", PracticeMenu.convo, 100,100,0);
    SceneUtil.addImage(this, "", PracticeMenu.cooking, 100,560,0);
    SceneUtil.addImage(this, "", PracticeMenu.driving, 560,100,0);
    SceneUtil.addImage(this, "", PracticeMenu.sightseeing, 560,560,0);
    SceneUtil.addImage(this, "", PracticeMenu.text, 1200,200,0);
    SceneUtil.addImage(this, "", PracticeMenu.border, 0,0,1);


    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
