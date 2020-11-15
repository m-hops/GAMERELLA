class ConvoIntro extends Scene{
  static bkg;
  static overlay;
  static text;
  static voiceOver;

  static onPreload(){
    ConvoIntro.bkg = loadImage('assets/images/introScreens/convoBKG.png');
    ConvoIntro.overlay = loadImage('assets/images/generalAssets/textOverlayBar.png');
    ConvoIntro.text = loadImage('assets/images/generalAssets/textOverlayBar.png');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    SceneUtil.addImage(this, "", Introduction.bkgOverlay, 0,0,0);



    this.slide1bkg = new GameObject(null, "");
    this.slide1bkg.setPosition(0, 0, -4);
    this.slide1bkg.addComponent(new ImageRenderComponent("", Introduction.slide1BKG));

    this.addGameObject(this.slide1bkg);

    this.masterIntro = new GameObject(null,'');

    let slide1bkgPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    slide1bkgPosTimeline.targetObject = this.slide1bkg;
    slide1bkgPosTimeline.addKey(0,0,0,-1);
    slide1bkgPosTimeline.addKey(14028,-1200,0,-1);
    slide1bkgPosTimeline.addKey(14029,-1200,2000,-4);
    slide1bkgPosTimeline.start();

    this.addGameObject(this.masterIntro);

  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
