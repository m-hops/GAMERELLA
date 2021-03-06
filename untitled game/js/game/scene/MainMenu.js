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
    // SceneUtil.addImage(this, "", MainMenu.title, 80,160,1);
    // SceneUtil.addImage(this, "", MainMenu.start, 1300,900,1);
    // SceneUtil.addImage(this, "", MainMenu.govLogo, 200,950,1);

    SceneUtil.addSFX(this, "", MainMenu.theme, true);

    this.title = new GameObject(null, "");
    this.title.setPosition(80,160,1);
    this.title.addComponent(new ImageRenderComponent("", MainMenu.title));
    this.addGameObject(this.title);

    this.logo = new GameObject(null, "");
    this.logo.setPosition(200,950,1);
    this.logo.addComponent(new ImageRenderComponent("", MainMenu.govLogo));
    this.addGameObject(this.logo);

    this.startbtn = new GameObject(null, "");
    this.startbtn.setPosition(1300,900,2);
    this.startbtn.addComponent(new RectangleCollision('',0,0,504,137));
    this.startbtn.addComponent(new ImageRenderComponent("", MainMenu.start));
    this.startbtn.addComponent(new ActivateTimelinesOnClick());
    let startbtnTimeline = this.startbtn.addComponent(new EventTimeline());
    startbtnTimeline.addEvent( new EventChangeScene(1000, new Language()));

    let startbtnPosTimeline = this.startbtn.addComponent(new PositionTimeline());
    startbtnPosTimeline.addKey(0, 1300, 900,2);
    startbtnPosTimeline.addKey(1000, 1700, 900,2);

    let titleOutroPosTimeline = this.startbtn.addComponent(new PositionTimeline());
    titleOutroPosTimeline.targetObject = this.title;
    titleOutroPosTimeline.addKey(0, 80, 160, 2);
    titleOutroPosTimeline.addKey(1000,-220,160,2);

    let logoOutroPosTimeline = this.startbtn.addComponent(new PositionTimeline());
    logoOutroPosTimeline.targetObject = this.logo;
    logoOutroPosTimeline.addKey(0,200,950,2);
    logoOutroPosTimeline.addKey(1000,-100,950,2);

    this.addGameObject(this.startbtn);

    this.masterIntro = new GameObject(null, "");

    let masterIntroStartbtnPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    masterIntroStartbtnPosTimeline.targetObject = this.startbtn;
    masterIntroStartbtnPosTimeline.addKey(0, 1700, 900, 2);
    masterIntroStartbtnPosTimeline.addKey(1000,1300,900,2);
    masterIntroStartbtnPosTimeline.start();

    let masterIntroTitlePosTimeline = this.title.addComponent(new PositionTimeline());
    masterIntroTitlePosTimeline.targetObject = this.title;
    masterIntroTitlePosTimeline.addKey(0, -220, 160,2);
    masterIntroTitlePosTimeline.addKey(1000, 80, 160,2);
    masterIntroTitlePosTimeline.start();

    let masterIntroLogoPosTimeline = this.logo.addComponent(new PositionTimeline());
    masterIntroLogoPosTimeline.targetObject = this.logo;
    masterIntroLogoPosTimeline.addKey(0,-100,950,2);
    masterIntroLogoPosTimeline.addKey(1000,200,950,2);
    masterIntroLogoPosTimeline.start();

    this.addGameObject(this.masterIntro);


    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){
  }

  onDraw(renderer){

  }
}
