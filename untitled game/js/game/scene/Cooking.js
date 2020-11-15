

class CookingPaddy extends GameObjectComponent{
  //static CookingPosition = new p5.Vector(1450,450,1);
  constructor(){
    super("CookingPaddy");
    this.cooked = false;
    this.cooking = false;
    this.cookTime = 1000;
  }

  run(){
    if(this.cooking){
      console.log("rrrrrrrrrr");
      this.cookTime -= deltaTime;
      if(this.cookTime <= 0){
        this.setCooked();
      }
    }
  }
  setCooked(){
    this.cooked = true;
    let cooked = this.owner.getFirstComponentByName("cooked");
    if(cooked != null){
      cooked.enabled = true;
    }
    let raw = this.owner.getFirstComponentByName("raw");
    if(raw != null){
      raw.enabled = false;
    }
  }
  setRaw(){
    this.cooked = false;
    let cooked = this.owner.getFirstComponentByName("cooked");
    if(cooked != null){
      cooked.enabled = false;
    }
    let raw = this.owner.getFirstComponentByName("raw");
    if(raw != null){
      raw.enabled = true;
    }
  }
  onClick(){
    if(this.cooked){
      this.setRaw();
    } else {
      this.setCooked();
    }
  }

}

class CookingArm extends GameObjectComponent{

  constructor(){
    super("CookingArm");
  }
  onTryDrop(paddy, attachComp){
    let cookingZone = this.getScene().getFirstGameObjectComponentByName("CookingZone", true, true);

    let offset = p5.Vector.sub(cookingZone.getPosition(), paddy.getPosition());
    let dist = offset.mag();

    if(dist < Cooking.CookRadius){
      paddy.owner.removeComponent(attachComp);
      paddy.cooking = true;
      return;
    }

    let bunGo = this.getScene().getFirstGameObjectByName("Bun");

    offset = p5.Vector.sub(bunGo.getPosition(), paddy.getPosition());
    dist = offset.mag();

    if(dist < Cooking.BunRadius){
      paddy.owner.removeComponent(attachComp);
      return;
    }
  }
  onTryPickupPaddy(paddy){
    let offset = p5.Vector.sub(paddy.getPosition(), this.getPosition());
    let dist = offset.mag();
    if(dist < Cooking.PaddyRadius){
      paddy.owner.addComponent(new AttachToObject("attach", this.owner, new p5.Vector(offset.x,offset.y,1)));
      paddy.cooking = false;
    }
  }
  onClick(){
    let paddy = this.getScene().getFirstGameObjectComponentByName("CookingPaddy", true, true);
    if(paddy != null){
      console.log("CookingArm.onClick paddy");
      let attach = paddy.owner.getFirstComponentByName("attach");
      if(attach != null){
        this.onTryDrop(paddy, attach);
      } else{
        this.onTryPickupPaddy(paddy);
      }
    }
  }
}

class CookingZone extends GameObjectComponent{
  constructor(){
    super("CookingZone");
  }
}


class Cooking extends Scene{
  static debug = true;
  static RawPosition = new p5.Vector(1450,450,1);
  static CookPosition = new p5.Vector(50,250,1);
  static CookRadius = 200;
  static BunRadius = 200;
  static PaddyRadius = 200;

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

  constructor(callbackObj=null, callbackFunc=null){
    super();
    this.callbackObj = callbackObj;
    this.callbackFunc = callbackFunc;
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    this.paddy = new GameObject(null, "Paddy");
    this.paddy.setPositionVector(Cooking.RawPosition);
    let paddyComp = this.paddy.addComponent(new CookingPaddy());
    this.paddy.addComponent(new ImageRenderComponent("raw", Cooking.pRaw));
    this.paddy.addComponent(new ImageRenderComponent("cooked", Cooking.pCooked));
    paddyComp.setRaw();
    this.addGameObject(this.paddy);

    this.arm = new GameObject(null, "Arm");
    let armComp = this.arm.addComponent(new CookingArm());
    this.arm.addComponent(new ImageRenderComponent("Img", Cooking.arm));
    this.arm.addComponent(new InteractiveComponent("Arm interactable", armComp, armComp.onClick));
    this.arm.addComponent(new AttachToMouse("attach", -200,-400));
    this.addGameObject(this.arm);

    this.cookingZone = new GameObject(null, "CookingZone");
    this.cookingZone.setPositionVector(Cooking.CookPosition);
    let cookingZoneComp = this.cookingZone.addComponent(new CookingZone());
    this.addGameObject(this.cookingZone);

    let objectBG = SceneUtil.addImage(this, "Background", Cooking.background, 0,0,-3);

    let objectBun = SceneUtil.addImage(this, "Bun", Cooking.bun, 1400,400,-2);

    //let objectPCooked = SceneUtil.addImage(this, "PCook", Cooking.pCooked, 100,400,-1);

    //let objectPRaw = SceneUtil.addImage(this, "PRaw", Cooking.pRaw, 1450,450,1);

    //this.arm = SceneUtil.addImage(this, "Arm", Cooking.arm, mouseX,mouseY,0);


    let objectBorder = SceneUtil.addImage(this, "border", Cooking.border, 0,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);
    this.timerObject = new CountdownTimerObject();
    this.timerObject.setPosition(800,150,5);
    this.addGameObject(this.timerObject);

    this.resultMsgObject = new ResultMsgObject(this.callbackObj, this.callbackFunc);
    this.resultMsgObject.nextScene = new Driving();
    this.addGameObject(this.resultMsgObject);
    // this.timerObject = new GameObject(null, "Timer");
    // this.timerObject.setPosition(800,150,5);
    // this.timerObject.addComponent(new CountdownTimerComponent());
    // let timerText = this.timerObject.addComponent(new TextRenderComponent("text","00:00", color(255,0,0), "arial"));
    // timerText.size = 64;
    // this.addGameObject(this.timerObject);


    if(Engine.DebugDrawOn){
      this.cookingZone.addComponent(new CircleRenderComponent("", Cooking.CookRadius));
      objectBun.addComponent(new CircleRenderComponent("", Cooking.BunRadius));
      this.paddy.addComponent(new CircleRenderComponent("", Cooking.PaddyRadius));
    }
  }

  onUpdate(){
    if(this.timerObject.isOver() && !this.resultMsgObject.isTimerActive()){
      this.resultMsgObject.setFail();
    }
  }

  onDraw(renderer){

  }



}
