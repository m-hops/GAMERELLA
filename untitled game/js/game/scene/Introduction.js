class Introduction extends Scene{
  static border;
  static bkgOverlay;
  static slide1BKG;
  static slide1Txt;
  static slide2BKG;
  static slide2Txt;
  static slide3BKG;
  static slide3Txt;
  static slide4BKG;
  static slide4Txt;
  static myAudio;

  static onPreload(){
    Introduction.border = loadImage('assets/images/3. intro/pageBorder.png');
    Introduction.bkgOverlay = loadImage('assets/images/3. intro/blueFadeOverlay.png');

    Introduction.slide1BKG = loadImage('assets/images/3. intro/slide1/BKG.png');
    Introduction.slide1Txt = loadImage('assets/images/3. intro/slide1/text.png');
    Introduction.slide2BKG = loadImage('assets/images/3. intro/slide2/bkg.png');
    Introduction.slide2Txt = loadImage('assets/images/3. intro/slide2/text.png');
    Introduction.slide3BKG = loadImage('assets/images/3. intro/slide3/bkg.png');
    Introduction.slide3Txt = loadImage('assets/images/3. intro/slide3/text.png');
    Introduction.slide4BKG = loadImage('assets/images/3. intro/slide4/bkg.png');
    Introduction.slide4Txt = loadImage('assets/images/3. intro/slide4/text.png');

    Introduction.myAudio = loadSound('assets/sounds/voiceOver/3. Introduction/introAll.mp3');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    // SceneUtil.addImage(this, "", Introduction.slide1BKG, 0,0,-1);
    // SceneUtil.addImage(this, "", Introduction.slide2BKG, 0,0,-1);
    // SceneUtil.addImage(this, "", Introduction.slide3BKG, 0,0,-1);
    // SceneUtil.addImage(this, "", Introduction.slide4BKG, 0,0,-1);
    SceneUtil.addImage(this, "", Introduction.bkgOverlay, 0,0,0);
    // SceneUtil.addImage(this, "", Introduction.slide1Txt, 100,300,1);
    // SceneUtil.addImage(this, "", Introduction.slide2Txt, 100,350,1);
    // SceneUtil.addImage(this, "", Introduction.slide3Txt, 100,350,1);
    // SceneUtil.addImage(this, "", Introduction.slide4Txt, 100,400,1);
    SceneUtil.addImage(this, "", Introduction.border, 0,0,5);

    SceneUtil.addSFX(this, "", Introduction.myAudio, true);

    this.slide1bkg = new GameObject(null, "");
    this.slide1bkg.setPosition(0, 0, -4);
    this.slide1bkg.addComponent(new ImageRenderComponent("", Introduction.slide1BKG));

    this.slide2bkg = new GameObject(null, "");
    this.slide2bkg.setPosition(0, 2000, -4);
    this.slide2bkg.addComponent(new ImageRenderComponent("", Introduction.slide2BKG));

    this.slide3bkg = new GameObject(null, "");
    this.slide3bkg.setPosition(0, 2000, -4);
    this.slide3bkg.addComponent(new ImageRenderComponent("", Introduction.slide3BKG));

    this.slide4bkg = new GameObject(null, "");
    this.slide4bkg.setPosition(0, 2000, -4);
    this.slide4bkg.addComponent(new ImageRenderComponent("", Introduction.slide4BKG));

    this.text1 = new GameObject(null, "");
    this.text1.setPosition(100, 300, 1);
    this.text1.addComponent(new ImageRenderComponent("", Introduction.slide1Txt));

    this.text2 = new GameObject(null, "");
    this.text2.setPosition(0, 2000, 1);
    this.text2.addComponent(new ImageRenderComponent("", Introduction.slide2Txt));

    this.text3 = new GameObject(null, "");
    this.text3.setPosition(0, 2000, 1);
    this.text3.addComponent(new ImageRenderComponent("", Introduction.slide3Txt));

    this.text4 = new GameObject(null, "");
    this.text4.setPosition(0, 2000, 1);
    this.text4.addComponent(new ImageRenderComponent("", Introduction.slide4Txt));

    this.addGameObject(this.slide1bkg);
    this.addGameObject(this.slide2bkg);
    this.addGameObject(this.slide3bkg);
    this.addGameObject(this.slide4bkg);

    this.addGameObject(this.text1);
    this.addGameObject(this.text2);
    this.addGameObject(this.text3);
    this.addGameObject(this.text4);

    this.masterIntro = new GameObject(null,'');

    let slide1bkgPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    slide1bkgPosTimeline.targetObject = this.slide1bkg;
    slide1bkgPosTimeline.addKey(0,0,0,-1);
    slide1bkgPosTimeline.addKey(14028,-1200,0,-1);
    slide1bkgPosTimeline.addKey(14029,-1200,2000,-4);
    slide1bkgPosTimeline.start();

    let text1PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    text1PosTimeline.targetObject = this.text1;
    text1PosTimeline.addKey(0,100,300,4);
    text1PosTimeline.addKey(12328,100,200,4);
    text1PosTimeline.addKey(14028,200,3000,1);
    text1PosTimeline.start();

    let slide2bkgPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    slide2bkgPosTimeline.targetObject = this.slide2bkg;
    slide2bkgPosTimeline.addKey(14029,0,0,-1);
    slide2bkgPosTimeline.addKey(24790,0,0,-1);
    slide2bkgPosTimeline.addKey(24791,0,2000,-4);
    slide2bkgPosTimeline.start();

    let text2PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    text2PosTimeline.targetObject = this.text2;
    text2PosTimeline.addKey(14029,100,350,4);
    text2PosTimeline.addKey(24090,100,250,4);
    text2PosTimeline.addKey(24790,200,3000,1);
    text2PosTimeline.start();

    let slide3bkgPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    slide3bkgPosTimeline.targetObject = this.slide3bkg;
    slide3bkgPosTimeline.addKey(24790,0,0,-1);
    slide3bkgPosTimeline.addKey(37218,0,0,-1);
    slide3bkgPosTimeline.addKey(37219,0,2000,-4);
    slide3bkgPosTimeline.start();

    let text3PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    text3PosTimeline.targetObject = this.text3;
    text3PosTimeline.addKey(24790,100,350,4);
    text3PosTimeline.addKey(36518,100,250,4);
    text3PosTimeline.addKey(37218,200,3000,1);
    text3PosTimeline.start();

    let slide4bkgPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    slide4bkgPosTimeline.targetObject = this.slide4bkg;
    slide4bkgPosTimeline.addKey(37218,0,0,-1);
    slide4bkgPosTimeline.addKey(42634,0,0,-1);
    slide4bkgPosTimeline.addKey(42634,0,2000,-4);
    slide4bkgPosTimeline.start();

    let text4PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    text4PosTimeline.targetObject = this.text4;
    text4PosTimeline.addKey(37218,100,400,4);
    text4PosTimeline.addKey(41934,100,300,4);
    text4PosTimeline.addKey(42364,100,3000,1);
    text4PosTimeline.start();

    let eventTimeline = this.masterIntro.addComponent(new EventTimeline());
    eventTimeline.addEvent(new EventChangeScene(42464, new GameStart(Game.instance)));
    eventTimeline.start();

    this.addGameObject(this.masterIntro);



    this.skipButton = new GameObject(null, "SkipButton");
    this.skipButton.setPosition(800,800);
    this.skipButton.addComponent(new RectangleCollision("rect", 0,0, 200, 100));
    this.skipButton.addComponent(new ActivateTimelinesOnClick());
    let skipButtonTimeline = this.skipButton.addComponent(new EventTimeline());
    //skipButtonTimeline.addEvent( new EventSFX(0, SampleScene.testSFX2));
    skipButtonTimeline.addEvent( new EventChangeScene(0, new GameStart(Game.instance)));
    this.addGameObject(this.skipButton);
    Game.instance.reset();
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
