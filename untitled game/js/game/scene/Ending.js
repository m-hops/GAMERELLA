class Ending extends Scene{
  static background1;
  static background2;
  static border;
  static text1;
  static text2;
  static overlay;

  static onPreload(){
    Ending.background1 = loadImage('assets/images/Ending/bkg1.png');
    Ending.background2 = loadImage('assets/images/Ending/bkg2.png');
    Ending.border = loadImage('assets/images/Ending/Border.png');
    Ending.text1 = loadImage('assets/images/Ending/text1.png');
    Ending.text2 = loadImage('assets/images/Ending/text2.png');
    Ending.overlay = loadImage('assets/images/Ending/blueFadeOverlay.png');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    // SceneUtil.addImage(this, "", Ending.background1, -250,0,-1);
    SceneUtil.addImage(this, "", Ending.background2, -380,0,-1);
    SceneUtil.addImage(this, "", Ending.overlay, 0,0,0);
    // SceneUtil.addImage(this, "", Ending.text1, 240,240,1);
    SceneUtil.addImage(this, "", Ending.text2, 240,280,1);
    SceneUtil.addImage(this, "", Ending.border,-50,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);

    SceneUtil.addSFX(this, "", MainMenu.theme, true);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
