class ConvoIntro extends Scene{
  static bkg;
  static overlay;
  static text;
  static mouse;
  static v1;
  static v2;
  static v3;

  static onPreload(){
    ConvoIntro.bkg = loadImage('assets/images/introScreens/convoBKG.png');
    ConvoIntro.overlay = loadImage('assets/images/generalAssets/textOverlayBar.png');
    ConvoIntro.mouseTxt = loadImage('assets/images/generalAssets/mouseIntro.png');
    ConvoIntro.firstRound = loadImage('assets/images/generalAssets/convo/convo1.png');
    ConvoIntro.secondRound = loadImage('assets/images/generalAssets/convo/convo2.png');
    ConvoIntro.thirdRound = loadImage('assets/images/generalAssets/convo/convo3.png');

    ConvoIntro.mouse = loadSound('assets/sounds/voiceOver/General/mouse instructions.mp3');
    ConvoIntro.v1 = loadSound('assets/sounds/voiceOver/Convo/title1.mp3');
    ConvoIntro.v2 = loadSound('assets/sounds/voiceOver/Convo/title2.mp3');
    ConvoIntro.v3 = loadSound('assets/sounds/voiceOver/Convo/title4.mp3');
  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    SceneUtil.addImage(this, "", ConvoIntro.bkg, -380,0,-1);

    // SceneUtil.addImage(this, "", ConvoIntro.mouseTxt,400,460,1);

    SceneUtil.addImage(this, "", ConvoIntro.overlay, 0,400,0);

    if (Game.instance.convoIteration == 1){

      this.howto = new GameObject(null, "");
      this.howto.setPosition(0, 460, 1);
      this.howto.addComponent(new ImageRenderComponent("", ConvoIntro.mouseTxt));
      let howtoTimeline = this.howto.addComponent(new EventTimeline());
      howtoTimeline.addEvent( new EventSFX(500, ConvoIntro.mouse));

      howtoTimeline.start();

      this.round1 = new GameObject(null, "");
      this.round1.setPosition(-1500, 440, 1);
      this.round1.addComponent(new ImageRenderComponent("", ConvoIntro.firstRound));
      let round1Timeline = this.round1.addComponent(new EventTimeline());
      round1Timeline.addEvent( new EventSFX(3500, ConvoIntro.v1));

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
      round1PosTimeline.addKey(6000,300,440,1);
      round1PosTimeline.addKey(6500,2000,440,1);
      round1PosTimeline.start();

      this.addGameObject(this.masterIntro);
    }

    if (Game.instance.convoIteration == 2){

      this.round1 = new GameObject(null, "");
      this.round1.setPosition(-1500, 440, 1);
      this.round1.addComponent(new ImageRenderComponent("", ConvoIntro.firstRound));
      let round1Timeline = this.round1.addComponent(new EventTimeline());
      round1Timeline.addEvent( new EventSFX(500, ConvoIntro.v1));

      round1Timeline.start();

      this.round2 = new GameObject(null, "");
      this.round2.setPosition(-700, 460, 1);
      this.round2.addComponent(new ImageRenderComponent("", ConvoIntro.secondRound));
      let round2Timeline = this.round2.addComponent(new EventTimeline());
      round2Timeline.addEvent( new EventSFX(500, ConvoIntro.v2));

      round2Timeline.start();

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
      round2PosTimeline.addKey(5500,900,460,1);
      round2PosTimeline.addKey(6000,2000,460,1);
      round2PosTimeline.start();

      this.addGameObject(this.masterIntro);
    }

    if (Game.instance.convoIteration == 3){

      this.round1 = new GameObject(null, "");
      this.round1.setPosition(-1500, 440, 1);
      this.round1.addComponent(new ImageRenderComponent("", ConvoIntro.firstRound));
      let round1Timeline = this.round1.addComponent(new EventTimeline());
      round1Timeline.addEvent( new EventSFX(500, ConvoIntro.v1));

      round1Timeline.start();

      this.round2 = new GameObject(null, "");
      this.round2.setPosition(-700, 460, 1);
      this.round2.addComponent(new ImageRenderComponent("", ConvoIntro.secondRound));
      let round2Timeline = this.round2.addComponent(new EventTimeline());
      round2Timeline.addEvent( new EventSFX(500, ConvoIntro.v2));

      round2Timeline.start();

      this.round3 = new GameObject(null, "");
      this.round3.setPosition(-1300, 440, 1);
      this.round3.addComponent(new ImageRenderComponent("", ConvoIntro.thirdRound));
      let round3Timeline = this.round3.addComponent(new EventTimeline());
      round3Timeline.addEvent( new EventSFX(500, ConvoIntro.v3));

      round3Timeline.start();

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
      round2PosTimeline.addKey(5500,900,460,1);
      round2PosTimeline.addKey(6000,2000,460,1);
      round2PosTimeline.start();

      let round3PosTimeline = this.masterIntro.addComponent(new PositionTimeline());
      round3PosTimeline.targetObject = this.round3;
      round3PosTimeline.addKey(6000,-1300,440,1);
      round3PosTimeline.addKey(6500,400,440,1);
      round3PosTimeline.addKey(8500,900,440,1);
      round3PosTimeline.addKey(9000,2000,440,1);
      round3PosTimeline.start();

      this.addGameObject(this.masterIntro);
    }



  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
