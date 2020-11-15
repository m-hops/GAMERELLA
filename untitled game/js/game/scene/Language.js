class Language extends Scene{
  static background;
  static english;
  static start;
  static title;
  static onPreload(){
    Language.background = loadImage('assets/images/2. language/languageBKG.png');
    Language.english = loadImage('assets/images/2. language/english.png');
    Language.french = loadImage('assets/images/2. language/francais.png');
    Language.title = loadImage('assets/images/2. language/languageTitle.png');

    Language.languageIntro = loadSound('assets/sounds/voiceOver/2. language selection/languageIntro.mp3');
    Language.englishAnswer = loadSound('assets/sounds/voiceOver/2. language selection/eng.mp3');
    Language.frenchAnswer = loadSound('assets/sounds/voiceOver/2. language selection/fren.mp3');
  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    SceneUtil.addImage(this, "", Language.background, 0,0,0);
    // SceneUtil.addImage(this, "", Language.title, 135,160,1);
    // SceneUtil.addImage(this, "", Language.french, 1020,670,1);
    // SceneUtil.addImage(this, "", Language.english, 220,670,1);

    // SceneUtil.addSFX(this, "", Language.languageIntro, true);

    this.englishBTN = new GameObject(null, "");
    this.englishBTN.setPosition(-800, 670,2);
    this.englishBTN.addComponent(new RectangleCollision('test',0,0,671,242,2));
    this.englishBTN.addComponent(new ImageRenderComponent("", Language.english));
    this.englishBTN.addComponent(new ActivateTimelinesOnClick());
    let englishBTNTimeline = this.englishBTN.addComponent(new EventTimeline());
    englishBTNTimeline.addEvent( new EventSFX(0, Language.englishAnswer));
    englishBTNTimeline.addEvent( new EventChangeScene(3500, new Introduction()));

    this.frenchBTN = new GameObject(null, "");
    this.frenchBTN.setPosition(2040, 670,2);
    this.frenchBTN.addComponent(new RectangleCollision('test',0,0,671,242,2));
    this.frenchBTN.addComponent(new ImageRenderComponent("", Language.french));
    this.frenchBTN.addComponent(new ActivateTimelinesOnClick());
    let frenchBTNTimeline = this.frenchBTN.addComponent(new EventTimeline());
    frenchBTNTimeline.addEvent( new EventSFX(0, Language.frenchAnswer));
    frenchBTNTimeline.addEvent( new EventChangeScene(4500, new Introduction()));

    this.title = new GameObject(null, "");
    this.title.setPosition(-1200, 160,2);
    this.title.addComponent(new RectangleCollision('test',0,0,671,242,2));
    this.title.addComponent(new ImageRenderComponent("", Language.title));
    let intoTimeline = this.title.addComponent(new EventTimeline());
    intoTimeline.addEvent( new EventSFX(0, Language.languageIntro));

    intoTimeline.start();

    let frenchBTNOutroPosTimeline = this.frenchBTN.addComponent(new PositionTimeline());
    frenchBTNOutroPosTimeline.addKey(3200, 1020,670,1);
    frenchBTNOutroPosTimeline.addKey(4200, 2040, 670,2);

    this.addGameObject(this.englishBTN);
    this.addGameObject(this.frenchBTN);
    this.addGameObject(this.title);

    this.masterIntro = new GameObject(null,'');

    let masterIntroTitlePosTimeline = this.title.addComponent(new PositionTimeline());
    masterIntroTitlePosTimeline.targetObject = this.title;
    masterIntroTitlePosTimeline.addKey(1000, -1200, 160,2);
    masterIntroTitlePosTimeline.addKey(5000, 0, 160,2);
    masterIntroTitlePosTimeline.addKey(6000, 135,160,2);
    masterIntroTitlePosTimeline.start();

    let masterIntroEnglishBTNPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    masterIntroEnglishBTNPosTimeline.targetObject = this.englishBTN;
    masterIntroEnglishBTNPosTimeline.addKey(15000,-800, 670,2);
    masterIntroEnglishBTNPosTimeline.addKey(23000,220,670,2);
    masterIntroEnglishBTNPosTimeline.start();

    let masterIntroFrenchBTNPosTimeline = this.masterIntro.addComponent(new PositionTimeline());
    masterIntroFrenchBTNPosTimeline.targetObject = this.frenchBTN;
    masterIntroFrenchBTNPosTimeline.addKey(15000, 2040, 670,2);
    masterIntroFrenchBTNPosTimeline.addKey(23000, 1020,670,1);
    masterIntroFrenchBTNPosTimeline.start();

    this.addGameObject(this.masterIntro);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
