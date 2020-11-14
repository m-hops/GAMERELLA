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
    SceneUtil.addImage(this, Language.background, 0,0,0);
    SceneUtil.addImage(this, Language.title, 135,160,1);
    SceneUtil.addImage(this, Language.french, 1020,670,1);
    SceneUtil.addImage(this, Language.english, 220,670,1);


    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
