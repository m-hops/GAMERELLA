class Driving extends Scene{
  static background1;
  static knob;
  static hOpen;
  static hClosed;
  static dash;
  static ped1;
  static ped2;
  static road;
  static border;

  static onPreload(){
    Driving.background1 = loadImage('assets/images/driving/stage1/BKG.png');
    Driving.knob = loadImage('assets/images/driving/stage1/gearKnob.png');
    Driving.hOpen = loadImage('assets/images/driving/stage1/handOpen.png');
    Driving.hClosed = loadImage('assets/images/driving/stage1/handClosed.png');

    Driving.road = loadImage('assets/images/driving/stage2/road.png');
    Driving.dash = loadImage('assets/images/driving/stage2/dashboard.png');
    Driving.ped1 = loadImage('assets/images/driving/stage2/pedestrian1.png');
    Driving.ped2 = loadImage('assets/images/driving/stage2/pedestrian2.png');

    Driving.border = loadImage('assets/images/driving/border.png');
  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    //STAGE1//
    // SceneUtil.addImage(this, Driving.background1, 0,0,-2);
    // SceneUtil.addImage(this, Driving.knob, 125,90,0);
    // SceneUtil.addImage(this, Driving.hOpen, 0,0,0,600,1250);
    // SceneUtil.addImage(this, Driving.hClosed, 0,0,0,420,1200);

    //STAGE2//
    SceneUtil.addImage(this, Driving.road, 0,0,-2);
    SceneUtil.addImage(this, Driving.ped1, 0,0,-1);
    SceneUtil.addImage(this, Driving.ped2, 0,0,-1);
    SceneUtil.addImage(this, Driving.hClosed, 900,450,1,350,1000);
    SceneUtil.addImage(this, Driving.dash, 0,0,0);

    SceneUtil.addImage(this, Driving.border, 0,0,2);
    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
