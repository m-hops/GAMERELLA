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
  static slide1Audio;
  static slide2Audio;
  static slide3Audio;
  static slide4Audio;
  static onPreload(){
    Introduction.border = loadImage('assets/images/3. intro/pageBorder.png');
    Introduction.bkgOverlay = loadImage('assets/images/3. intro/blueFadeOverlay.png');

    Introduction.slide1BKG = loadImage('assets/images/3. intro/slide1/BKG.png');
    Introduction.slide1Txt = loadImage('assets/images/3. intro/slide1/text.png');
    Introduction.slide2BKG = loadImage('assets/images/3. intro/slide2/BKG.png');
    Introduction.slide2Txt = loadImage('assets/images/3. intro/slide2/text.png');
    Introduction.slide3BKG = loadImage('assets/images/3. intro/slide3/BKG.png');
    Introduction.slide3Txt = loadImage('assets/images/3. intro/slide3/text.png');
    Introduction.slide4BKG = loadImage('assets/images/3. intro/slide4/BKG.png');
    Introduction.slide4Txt = loadImage('assets/images/3. intro/slide4/text.png');

    Introduction.slide1Audio = loadSound('assets/sounds/voiceOver/3. Introduction/intro1.mp3');
    Introduction.slide2Audio = loadSound('assets/sounds/voiceOver/3. Introduction/intro2.mp3');
    Introduction.slide3Audio = loadSound('assets/sounds/voiceOver/3. Introduction/intro3.mp3');
    Introduction.slide4Audio = loadSound('assets/sounds/voiceOver/3. Introduction/intro4.mp3');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    // SceneUtil.addImage(this, Introduction.slide1BKG, 0,0,-1);
    // SceneUtil.addImage(this, Introduction.slide2BKG, 0,0,-1);
    // SceneUtil.addImage(this, Introduction.slide3BKG, 0,0,-1);
    SceneUtil.addImage(this, Introduction.slide4BKG, 0,0,-1);
    SceneUtil.addImage(this, Introduction.bkgOverlay, 0,0,0);
    // SceneUtil.addImage(this, Introduction.slide1Txt, 100,300,1);
    // SceneUtil.addImage(this, Introduction.slide2Txt, 100,350,1);
    // SceneUtil.addImage(this, Introduction.slide3Txt, 100,350,1);
    SceneUtil.addImage(this, Introduction.slide4Txt, 100,400,1);
    SceneUtil.addImage(this, Introduction.border, 0,0,2);


    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
