class CookingIntro extends Scene{
  static bkg;
  static overlay;
  static text;
  static mouse;
  static v1;
  static v2;
  static v3;

  static onPreload(){
    CookingIntro.bkg = loadImage('assets/images/introScreens/cookingBKG.png');
    CookingIntro.overlay = loadImage('assets/images/generalAssets/textOverlayBar.png');
    CookingIntro.mouseTxt = loadImage('assets/images/generalAssets/mouseIntro.png');
    CookingIntro.firstRound = loadImage('assets/images/generalAssets/cookingText/cook1.png');
    CookingIntro.secondRound = loadImage('assets/images/generalAssets/cookingText/cook2.png');
    CookingIntro.thirdRound = loadImage('assets/images/generalAssets/cookingText/cook3.png');

    CookingIntro.mouse = loadSound('assets/sounds/voiceOver/General/mouse instructions.mp3');
    CookingIntro.v1 = loadSound('assets/sounds/voiceOver/cooking/title1.mp3');
    CookingIntro.v2 = loadSound('assets/sounds/voiceOver/cooking/title2.mp3');
    CookingIntro.v3 = loadSound('assets/sounds/voiceOver/cooking/title4.mp3');
  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    SceneUtil.addImage(this, "", CookingIntro.bkg, -120,0,-1);

    // SceneUtil.addImage(this, "", ConvoIntro.mouseTxt,400,460,1);

    SceneUtil.addImage(this, "", CookingIntro.overlay, 0,400,0);

    if (Game.instance.cookingIteration == 1){

      this.howto = new GameObject(null, "");
      this.howto.setPosition(0, 460, 1);
      this.howto.addComponent(new ImageRenderComponent("", CookingIntro.mouseTxt));
      let howtoTimeline = this.howto.addComponent(new EventTimeline());
      howtoTimeline.addEvent( new EventSFX(500, CookingIntro.mouse));

      howtoTimeline.start();

      this.round1 = new GameObject(null, "");
      this.round1.setPosition(-1500, 440, 1);
      this.round1.addComponent(new ImageRenderComponent("", CookingIntro.firstRound));
      let round1Timeline = this.round1.addComponent(new EventTimeline());
      round1Timeline.addEvent( new EventSFX(3500, CookingIntro.v1));

      round1Timeline.start();

      this.addGameObject(this.howto);
      this.addGameObject(this.round1);

      this.masterIntro = new GameObject(null,'');

      let howtoPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      howtoPosTimeline.targetObject = this.howto;
      howtoPosTimeline.addKey(0,-200,460,1);
      howtoPosTimeline.addKey(500,400,460,1);
      howtoPosTimeline.addKey(2500,900,460,1);
      howtoPosTimeline.addKey(3000,2000,460,1);
      howtoPosTimeline.start();

      let round1PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round1PosTimeline.targetObject = this.round1;
      round1PosTimeline.addKey(3000,-1500,440,1);
      round1PosTimeline.addKey(3500,200,440,1);
      round1PosTimeline.addKey(6000,700,440,1);
      round1PosTimeline.addKey(6500,2000,440,1);
      round1PosTimeline.start();

      this.addGameObject(this.masterIntro);
    }

    if (Game.instance.cookingIteration == 2){

      this.round1 = new GameObject(null, "");
      this.round1.setPosition(-1500, 440, 1);
      this.round1.addComponent(new ImageRenderComponent("", CookingIntro.firstRound));
      let round1Timeline = this.round1.addComponent(new EventTimeline());
      round1Timeline.addEvent( new EventSFX(500, CookingIntro.v2));

      round1Timeline.start();

      this.round2 = new GameObject(null, "");
      this.round2.setPosition(-900, 460, 1);
      this.round2.addComponent(new ImageRenderComponent("", CookingIntro.secondRound));

      this.addGameObject(this.round2);
      this.addGameObject(this.round1);

      this.masterIntro = new GameObject(null,'');

      let round1PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round1PosTimeline.targetObject = this.round1;
      round1PosTimeline.addKey(0,-1500,440,1);
      round1PosTimeline.addKey(500,200,440,1);
      round1PosTimeline.addKey(2500,700,440,1);
      round1PosTimeline.addKey(3000,2000,440,1);
      round1PosTimeline.start();

      let round2PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round2PosTimeline.targetObject = this.round2;
      round2PosTimeline.addKey(3000,-900,460,1);
      round2PosTimeline.addKey(3500,400,460,1);
      round2PosTimeline.addKey(4500,900,460,1);
      round2PosTimeline.addKey(5000,2000,460,1);
      round2PosTimeline.start();

      this.addGameObject(this.masterIntro);
    }

    if (Game.instance.cookingIteration == 3){

      this.round1 = new GameObject(null, "");
      this.round1.setPosition(-1500, 440, 1);
      this.round1.addComponent(new ImageRenderComponent("", CookingIntro.firstRound));
      let round1Timeline = this.round1.addComponent(new EventTimeline());
      round1Timeline.addEvent( new EventSFX(500, CookingIntro.v3));

      round1Timeline.start();

      this.round2 = new GameObject(null, "");
      this.round2.setPosition(-700, 460, 1);
      this.round2.addComponent(new ImageRenderComponent("", CookingIntro.secondRound));

      this.round3 = new GameObject(null, "");
      this.round3.setPosition(-1300, 440, 1);
      this.round3.addComponent(new ImageRenderComponent("", CookingIntro.thirdRound));

      this.addGameObject(this.round3);
      this.addGameObject(this.round2);
      this.addGameObject(this.round1);

      this.masterIntro = new GameObject(null,'');

      let round1PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round1PosTimeline.targetObject = this.round1;
      round1PosTimeline.addKey(0,-1500,440,1);
      round1PosTimeline.addKey(500,200,440,1);
      round1PosTimeline.addKey(2500,300,440,1);
      round1PosTimeline.addKey(3000,2000,440,1);
      round1PosTimeline.start();

      let round2PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round2PosTimeline.targetObject = this.round2;
      round2PosTimeline.addKey(3000,-700,460,1);
      round2PosTimeline.addKey(3500,400,460,1);
      round2PosTimeline.addKey(4500,900,460,1);
      round2PosTimeline.addKey(5000,2000,460,1);
      round2PosTimeline.start();

      let round3PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round3PosTimeline.targetObject = this.round3;
      round3PosTimeline.addKey(5000,-1300,440,1);
      round3PosTimeline.addKey(5500,400,440,1);
      round3PosTimeline.addKey(7500,900,440,1);
      round3PosTimeline.addKey(8000,2000,440,1);
      round3PosTimeline.start();

      this.addGameObject(this.masterIntro);
    }



  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
