class Ending extends Scene{
  static background1;
  static background2;
  static border;
  static text1;
  static text2;
  static overlay;
  static compBKG;
  static compOverlay
  static compText1;
  static compText2;
  static compText3;
  static theme;
  static endVO;

  static onPreload(){
    Ending.background1 = loadImage('assets/images/Ending/bkg1.png');
    Ending.background2 = loadImage('assets/images/Ending/bkg2.png');
    Ending.border = loadImage('assets/images/Ending/Border.png');
    Ending.text1 = loadImage('assets/images/Ending/text1.png');
    Ending.text2 = loadImage('assets/images/Ending/text2.png');
    Ending.overlay = loadImage('assets/images/Ending/blueFadeOverlay.png');

    Ending.theme = loadSound('assets/sounds/voiceOver/endTheme.mp3');
    Ending.endVO = loadSound('assets/sounds/voiceOver/endVO.mp3');
  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    // SceneUtil.addImage(this, "", Ending.background1, -250,0,-1);
    // SceneUtil.addImage(this, "", Ending.background2, -380,0,-1);
    SceneUtil.addImage(this, "", Ending.overlay, 0,0,-1);
    // SceneUtil.addImage(this, "", Ending.text1, 240,240,1);
    // SceneUtil.addImage(this, "", Ending.text2, 240,280,1);
    // SceneUtil.addImage(this, "", Ending.border,-50,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);

    SceneUtil.addSFX(this, "", Ending.theme, true);

    this.bkg2 = new GameObject(null, "");
    this.bkg2.setPosition(-380, 0, -1);
    this.bkg2.addComponent(new ImageRenderComponent("", Ending.background2));
    let goodbyeTimeline = this.bkg2.addComponent(new EventTimeline());
    goodbyeTimeline.addEvent( new EventSFX(0, Ending.endVO));

    goodbyeTimeline.start();

    this.borderOverlay = new GameObject(null, "");
    this.borderOverlay.setPosition(-50, 0, 5);
    this.borderOverlay.addComponent(new ImageRenderComponent("", Ending.border));

    this.txt2 = new GameObject(null, "");
    this.txt2.setPosition(240, 280, -2);
    this.txt2.addComponent(new ImageRenderComponent("", Ending.text2));

    this.addGameObject(this.bkg2);
    this.addGameObject(this.txt2);
    this.addGameObject(this.borderOverlay);

    this.masterIntro = new GameObject(null,'');

    let bkg2PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    bkg2PosTimeline.targetObject = this.bkg2;
    bkg2PosTimeline.addKey(0,-380,300,-2);
    bkg2PosTimeline.addKey(500,-380,-200,-2);
    bkg2PosTimeline.addKey(1500,-380,0,-2);
    bkg2PosTimeline.start();

    let borderPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    borderPosTimeline.targetObject = this.borderOverlay;
    borderPosTimeline.addKey(0,-380,300,5);
    borderPosTimeline.addKey(500,-380,-200,5);
    borderPosTimeline.addKey(1490,-380,0,5);
    borderPosTimeline.addKey(1500,-50,0,5);
    borderPosTimeline.start();

    let endingTxtPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    endingTxtPosTimeline.targetObject = this.txt2;
    endingTxtPosTimeline.addKey(0,240,280,-5);
    endingTxtPosTimeline.addKey(1500,240, 280, 2);
    endingTxtPosTimeline.start();

    this.addGameObject(this.masterIntro);

        this.tryAgainButton = new GameObject(null, "TryAgainButton");
        this.tryAgainButton.setPosition(800,800);
        this.tryAgainButton.addComponent(new RectangleCollision("rect", 0,0, 200, 100));
        this.tryAgainButton.addComponent(new ActivateTimelinesOnClick());
        let skipButtonTimeline = this.tryAgainButton.addComponent(new EventTimeline());
        //skipButtonTimeline.addEvent( new EventSFX(0, SampleScene.testSFX2));
        skipButtonTimeline.addEvent( new EventChangeScene(0, new Introduction()));
        this.addGameObject(this.tryAgainButton);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
