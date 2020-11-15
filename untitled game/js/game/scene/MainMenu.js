class MainMenu extends Scene{
  static background;
  static title;
  static start;
  static govLogo;
  static onPreload(){
    MainMenu.background = loadImage('assets/images/1. start/startSplash.png');
    MainMenu.title = loadImage('assets/images/1. start/title.png');
    MainMenu.start = loadImage('assets/images/1. start/startBtn.png');
    MainMenu.govLogo = loadImage('assets/images/1. start/govCanLogo.png');

    MainMenu.theme = loadSound('assets/sounds/menuTheme.mp3');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    SceneUtil.addImage(this, "", MainMenu.background, 0,0,0);
    SceneUtil.addImage(this, "", MainMenu.title, 80,160,1);
    SceneUtil.addImage(this, "", MainMenu.start, 1300,900,1);
    SceneUtil.addImage(this, "", MainMenu.govLogo, 200,950,1);

    SceneUtil.addSFX(this, "", MainMenu.theme, true);

    this.language = new GameObject(null, "toLanguage");
    this.language.setPosition(1300,900);
    this.language.addComponent(new RectangleCollision('toLlanguage',0,0,504,137));

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){
  }

  onDraw(renderer){

  }
}
