class Convo extends Scene{
  static background;
  static border;
  static hClosed;
  static hOpen;
  static player;
  static ss1;
  static ss2;
  static ss3;
  static bs1;
  static bs2;
  static bs3;
  static ant1;
  static ant2;

  static onPreload(){
    Convo.background = loadImage('assets/images/convo/BKG.png');
    Convo.border = loadImage('assets/images/convo/border.png');
    Convo.hClosed = loadImage('assets/images/convo/handClosed.png');
    Convo.hOpen = loadImage('assets/images/convo/handOpen.png');
    Convo.player = loadImage('assets/images/convo/player.png');

    Convo.ant1 = loadImage('assets/images/convo/ant1.png');
    Convo.ant2 = loadImage('assets/images/convo/ant2.png');

    Convo.ss1 = loadImage('assets/images/convo/smallSweat/smallSweat1.png');
    Convo.bs1 = loadImage('assets/images/convo/bigSweat/bigSweat1.png');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    SceneUtil.addImage(this, 'background', Convo.background, 0,0,-2);

    SceneUtil.addImage(this, 'hOpen', Convo.hOpen, 1000,0,0,410,1000);
    SceneUtil.addImage(this, 'hClosed', Convo.hClosed,600,0,0,350,1000);

    SceneUtil.addImage(this, 'hClosed', Convo.bs1,600,0,0);

    SceneUtil.addImage(this, 'player', Convo.player, 0,0,1);
    SceneUtil.addImage(this, 'border', Convo.border,0,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
