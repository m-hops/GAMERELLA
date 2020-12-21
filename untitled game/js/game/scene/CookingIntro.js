class MiniGameIntroScene extends Scene{
    constructor(config, game){
      super();
      this.config = config;
      this.game = game;
    }

    addIntroCard(cardConfig, beginTime=0){

      let cardObj = new GameObject(null, "");
      cardObj.setPosition(cardConfig.k0.x, cardConfig.y, cardConfig.z);
      if(cardConfig.img != null){
        cardObj.addComponent(new ImageRenderComponent("", cardConfig.img));
      }
      if(cardConfig.sfx != null){
        let eventTL = cardObj.addComponent(new EventTimeline());
        eventTL.addEvent( new EventSFX(cardConfig.sfxStartTime + beginTime, cardConfig.sfx));
        eventTL.start();
      }
      let posTL = cardObj.addComponent(new PositionTimeline());
      posTL.addKey(cardConfig.k0.t + beginTime, cardConfig.k0.x, cardConfig.y, cardConfig.z);
      posTL.addKey(cardConfig.k1.t + beginTime, cardConfig.k1.x, cardConfig.y, cardConfig.z);
      posTL.addKey(cardConfig.k2.t + beginTime, cardConfig.k2.x, cardConfig.y, cardConfig.z);
      posTL.addKey(cardConfig.k3.t + beginTime, cardConfig.k3.x, cardConfig.y, cardConfig.z);
      posTL.start();
      this.addGameObject(cardObj);
      return cardObj;
    }
}


class CookingIntro extends MiniGameIntroScene{
  static bkg;
  static overlay;
  static text;
  static mouse;
  static v1;
  static v2;
  static v3;

  static cardMouse;
  static cardCook;
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

    CookingIntro.cardMouse = {
      k0:{t:0   ,x:-200 },
      k1:{t:500 ,x: 400 },
      k2:{t:2500,x: 900 },
      k3:{t:3000,x: 2000},
      y:460,
      z:1,
      img:CookingIntro.mouseTxt,
      sfx:CookingIntro.mouse,
      sfxStartTime:500
    }
    CookingIntro.cardCook = {
      k0:{t:0   ,x:-1500},
      k1:{t:500 ,x: 200 },
      k2:{t:3000,x: 700 },
      k3:{t:3500,x: 2000},
      y:440,
      z:1,
      img:CookingIntro.firstRound,
      sfx:null,//CookingIntro.v1,
      sfxStartTime:500
    }

    CookingIntro.cardCookAndWatchout = {
      k0:{t:0   ,x:-900 },
      k1:{t:500 ,x: 400 },
      k2:{t:1500,x: 900 },
      k3:{t:2000,x: 2000},
      y:460,
      z:1,
      img:CookingIntro.secondRound,
      sfx:null,//CookingIntro.v2,
      sfxStartTime:500
    }
    CookingIntro.card3 = {
      k0:{t:0   ,x:-1300 },
      k1:{t:500 ,x: 400 },
      k2:{t:2500,x: 900 },
      k3:{t:3000,x: 2000},
      y:440,
      z:1,
      img:CookingIntro.thirdRound,
      sfx:null,//CookingIntro.v3,
      sfxStartTime:500
    }
  }

  constructor(config, game){
    super(config, game);
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    this.masterIntro = new GameObject(null,'');
    let masterEventTL = this.masterIntro.addComponent(new EventTimeline());


    SceneUtil.addImage(this, "", CookingIntro.bkg, -120,0,-1);

    // SceneUtil.addImage(this, "", ConvoIntro.mouseTxt,400,460,1);

    SceneUtil.addImage(this, "", CookingIntro.overlay, 0,400,0);
    console.log("Game.instance.cookingIteration = " + Game.instance.cookingIteration);
    //if (Game.instance.cookingIteration == 1){

    let seqTime = 0;
    this.addIntroCard(CookingIntro.cardMouse, seqTime);
    seqTime += CookingIntro.cardMouse.k3.t;

    masterEventTL.addEvent( new EventSFX(seqTime, CookingIntro.v1));

    this.addIntroCard(CookingIntro.cardCook, seqTime);
    seqTime += CookingIntro.cardCook.k3.t;

    this.addIntroCard(CookingIntro.cardCookAndWatchout, seqTime);
    seqTime += CookingIntro.cardCookAndWatchout.k3.t;

    this.addIntroCard(CookingIntro.card3, seqTime);
    seqTime += CookingIntro.card3.k3.t;

    masterEventTL.addEvent( new EventChangeScene(seqTime, new Cooking(this.config, this.game)));





    masterEventTL.start();
    this.addGameObject(this.masterIntro);

  }
  onUpdate(){

  }

  onDraw(renderer){

  }
}
