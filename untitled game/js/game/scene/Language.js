class Language extends Scene{
  static background;
  static title;
  static onPreload(){
    Language.background = loadImage('assets/images/2. language/languageBKG.png');
    Language.english = loadImage('assets/images/1. start/title.png');
    Language.start = loadImage('assets/images/1. start/startBtn.png');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    SceneUtil.addImage(this, Language.background, 0,0,0, 1920, 1080);


    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
