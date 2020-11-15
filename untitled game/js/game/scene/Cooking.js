class Cooking extends Scene{
  static background;
  static border;
  static arm;
  static bun;
  static pCooked;
  static pRaw;

  static onPreload(){
    Cooking.background = loadImage('assets/images/cooking/BKG.png');
    Cooking.border = loadImage('assets/images/cooking/border.png');
    Cooking.arm = loadImage('assets/images/cooking/armAndSpatula.png');
    Cooking.bun = loadImage('assets/images/cooking/bun.png');
    Cooking.pCooked = loadImage('assets/images/cooking/pattyCooked.png');
    Cooking.pRaw = loadImage('assets/images/cooking/pattyRaw.png');

  }

  constructor(){
    super();
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow

    let objectBG = SceneUtil.addImage(this, "Background", Cooking.background, 0,0,-3);

    let objectBun = SceneUtil.addImage(this, "Bun", Cooking.bun, 1400,400,-2);

    let objectPCooked = SceneUtil.addImage(this, "PCook", Cooking.pCooked, 100,400,-1);

    let objectPRaw = SceneUtil.addImage(this, "PRaw", Cooking.pRaw, 1450,450,1);

    this.arm = SceneUtil.addImage(this, "Arm", Cooking.arm, mouseX,mouseY,0);
    this.arm.addComponent(new AttachToMouse(-200,-400));


    let objectBorder = SceneUtil.addImage(this, "border", Cooking.border, 0,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
  }

  onUpdate(){

  }

  onDraw(renderer){

  }
}
