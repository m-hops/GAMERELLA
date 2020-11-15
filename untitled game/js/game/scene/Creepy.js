class Creepy extends Scene{
  static bkg;
  static compOverlay
  static compText1;
  static compText2;
  static compText3;
  static ambience;
  static beep;

  static onPreload(){
    Creepy.bkg = loadImage('assets/images/Ending/crepy/compBKG.png');
    Creepy.compOverlay = loadImage('assets/images/Ending/crepy/compOverlay.png');
    Creepy.compText1 = loadImage('assets/images/Ending/crepy/txt1.png');
    Creepy.compText2 = loadImage('assets/images/Ending/crepy/txt2.png');
    Creepy.compText3 = loadImage('assets/images/Ending/crepy/txt3.png');

    Creepy.ambience = loadSound('assets/sounds/sfx/computer.mp3');
    Creepy.beep = loadSound('assets/sounds/sfx/beep.mp3');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    SceneUtil.addImage(this, "", Creepy.bkg, 0,0,-1);
    SceneUtil.addImage(this, "", Creepy.compOverlay, -250,0,1);
    // SceneUtil.addImage(this, "", Creepy.compText1, 100,900,0);
    // SceneUtil.addImage(this, "", Creepy.compText2, 100,900,0);
    // SceneUtil.addImage(this, "", Creepy.compText3, 100,900,0);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);

    SceneUtil.addSFX(this, "", Creepy.ambience, true);

    this.txt1 = new GameObject(null, "");
    this.txt1.setPosition(0, 0, -2);
    this.txt1.addComponent(new ImageRenderComponent("", Creepy.compText1));
    let txt1audioTimeline = this.txt1.addComponent(new EventTimeline());
    txt1audioTimeline.addEvent( new EventSFX(0, ConvoIntro.v1));

    this.txt2 = new GameObject(null, "");
    this.txt2.setPosition(0, 0, -2);
    this.txt2.addComponent(new ImageRenderComponent("", Creepy.compText2));


    this.txt3 = new GameObject(null, "");
    this.txt3.setPosition(0, 0, -2);
    this.txt3.addComponent(new ImageRenderComponent("", Creepy.compText3));

    this.addGameObject(this.txt1);
    this.addGameObject(this.txt2);
    this.addGameObject(this.txt3);

    this.masterIntro = new GameObject(null,'');

    let txt1Timeline = this.masterIntro.addComponent(new PositionTimeline());
    txt1Timeline.targetObject = this.txt1;
    txt1Timeline.addKey(0,100,900,0);
    txt1Timeline.addKey(1000,100,900,-2);
    txt1Timeline.addKey(2000,100,900,0);
    txt1Timeline.addKey(3000,100,900,-2);
    txt1Timeline.addKey(4000,100,900,0);
    txt1Timeline.addKey(5000,100,900,-2);
    txt1Timeline.start();

    let txt2Timeline = this.masterIntro.addComponent(new PositionTimeline());
    txt2Timeline.targetObject = this.txt2;
    txt2Timeline.addKey(6000,100,900,0);
    txt2Timeline.addKey(7000,100,900,-2);
    txt2Timeline.addKey(8000,100,900,0);
    txt2Timeline.addKey(9000,100,900,-2);
    txt2Timeline.addKey(10000,100,900,0);
    txt2Timeline.addKey(11000,100,900,-2);
    txt2Timeline.start();

    let txt2Timeline = this.masterIntro.addComponent(new PositionTimeline());
    txt2Timeline.targetObject = this.txt23;
    txt2Timeline.addKey(12000,100,900,0);
    txt2Timeline.addKey(13000,100,900,-2);
    txt2Timeline.addKey(14000,100,900,0);
    txt2Timeline.addKey(15000,100,900,-2);
    txt2Timeline.addKey(16000,100,900,0);
    txt2Timeline.addKey(17000,100,900,-2);
    txt2Timeline.start();

    this.addGameObject(this.masterIntro);

  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
