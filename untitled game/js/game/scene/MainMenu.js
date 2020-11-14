


class MainMenu extends Scene{
  static background;
  static onPreload(){
    MainMenu.background = loadImage('assets/images/1. start/startSplash.png');
  }

  constructor(){
    super();
  }
  onSetup(){

    SceneUtil.addImage(this, MainMenu.background, 100,100, 0, 500, 200); // z at 0 will draw between -1 and 1
    SceneUtil.addImage(this, MainMenu.background, 150,150, 1, 500, 200); // z at 1 will draw on top
    SceneUtil.addImage(this, MainMenu.background, 50,200, -1, 500, 200); // z at -1 will draw bellow

    let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
