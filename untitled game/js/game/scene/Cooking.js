

class CookingPaddy extends GameObjectComponent{
  //static CookingPosition = new p5.Vector(1450,450,1);
  constructor(){
    super("CookingPaddy");
    this.cooked = false;
    this.cooking = false;
    this.cookTime = 1000;
    this.isPickedUp = false;
  }

  run(){
    if(this.cooking){
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
  cookStart(){
    this.cooking = true;
    Cooking.sizzle.loop();
  }
  cookStop(){
    this.cooking = false;
    Cooking.sizzle.stop();
  }
  onDispose(){
    Cooking.sizzle.stop();
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
    this.holdingObject = null;
  }
  drop(){
    if(this.holdingObject == null) return;
    let attachComp = this.holdingObject.owner.getFirstComponentByName("attach");
    if(attachComp == null){
      console.log("holding object must have a attach component");
      return;
    }
    let cookingZone = this.getScene().getFirstGameObjectComponentByName("CookingZone", true, true);

    let offset = p5.Vector.sub(cookingZone.getPosition(), this.holdingObject.getPosition());
    let dist = offset.mag();

    if(dist < Cooking.CookRadius){
      this.holdingObject.owner.removeComponent(attachComp);
      this.holdingObject.isPickedUp = false;
      this.holdingObject.cookStart();
      this.holdingObject = null;
      return;
    }

    // let bunGo = this.getScene().getFirstGameObjectByName("Bun");
    //
    // offset = p5.Vector.sub(bunGo.getPosition(), this.holdingObject.getPosition());
    // dist = offset.mag();
    //
    // if(dist < Cooking.BunRadius){
    //   this.holdingObject.owner.removeComponent(attachComp);
    //   this.holdingObject.isPickedUp = false;
    //   this.holdingObject = null;
    //   return;
    // }


    this.holdingObject.owner.removeComponent(attachComp);
    this.holdingObject.isPickedUp = false;
    this.holdingObject = null;
  }
  // onTryDrop(paddy, attachComp){
  //   let cookingZone = this.getScene().getFirstGameObjectComponentByName("CookingZone", true, true);
  //
  //   let offset = p5.Vector.sub(cookingZone.getPosition(), paddy.getPosition());
  //   let dist = offset.mag();
  //
  //   if(dist < Cooking.CookRadius){
  //     paddy.owner.removeComponent(attachComp);
  //     paddy.isPickedUp = false;
  //     paddy.cookStart();
  //     return;
  //   }
  //
  //   let bunGo = this.getScene().getFirstGameObjectByName("Bun");
  //
  //   offset = p5.Vector.sub(bunGo.getPosition(), paddy.getPosition());
  //   dist = offset.mag();
  //
  //   if(dist < Cooking.BunRadius){
  //     paddy.owner.removeComponent(attachComp);
  //     paddy.isPickedUp = false;
  //     return;
  //   }
  // }
  onTryPickupPaddy(paddy){
    let offset = p5.Vector.sub(paddy.getPosition(), this.getPosition());
    let dist = offset.mag();
    if(dist < Cooking.PaddyRadius){
      paddy.owner.addComponent(new AttachToObject("attach", this.owner, new p5.Vector(offset.x,offset.y,1)));
      if(paddy.cooking){
        paddy.cookStop();
      }
      paddy.isPickedUp = true;
      this.holdingObject = paddy;
    }
  }
  onClick(){
    if(this.holdingObject != null){
      this.drop();
    } else{
      let paddy = this.getScene().getFirstGameObjectComponentByName("CookingPaddy", true, true);
      if(paddy != null){
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


class Cooking extends GameScene{
  static debug = true;
  static RawPosition = new p5.Vector(1450,450,1);
  static CookPosition = new p5.Vector(50,250,1);
  static CookRadius = 200;
  static BunRadius = 200;
  static PaddyRadius = 200;
  static CatZoneRadius = 300;

  static background;
  static border;
  static arm;
  static bun;
  static pCooked;
  static pRaw;
  static paw;
  static fire;
  static catSFX;
  static catMeow;
  static sizzle;
  static onPreload(){
    Cooking.background = loadImage('assets/images/cooking/BKG.png');
    Cooking.border = loadImage('assets/images/cooking/border.png');
    Cooking.arm = loadImage('assets/images/cooking/armAndSpatula.png');
    Cooking.bun = loadImage('assets/images/cooking/bun.png');
    Cooking.pCooked = loadImage('assets/images/cooking/pattyCooked.png');
    Cooking.pRaw = loadImage('assets/images/cooking/pattyRaw.png');
    Cooking.paw = loadImage('assets/images/cooking/paw.png');
    Cooking.fire = loadImage('assets/images/cooking/fire.png');
    Cooking.catSFX = loadSound('assets/sounds/sfx/cooking/cat.mp3');
    Cooking.catMeow = loadSound('assets/sounds/sfx/cooking/meow.mp3');
    Cooking.sizzle = loadSound('assets/sounds/sfx/cooking/sizzle.mp3');
  }

  constructor(game){
    super(game);
  }
  onSetup(){
    super.onSetup();
    let timeRatio = (5 - (this.game.cookingIteration-1)) / 5.0;
    if(timeRatio <0) timeRatio = 0;
    this.setTimer(4000 + 4000 * timeRatio);
    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    this.paddy = new GameObject(null, "Paddy");
    this.paddy.setPositionVector(Cooking.RawPosition);
    this.paddyComp = this.paddy.addComponent(new CookingPaddy());
    this.paddy.addComponent(new ImageRenderComponent("raw", Cooking.pRaw));
    this.paddy.addComponent(new ImageRenderComponent("cooked", Cooking.pCooked));
    this.paddyComp.setRaw();
    this.addGameObject(this.paddy);

    this.arm = new GameObject(null, "Arm");
    this.armComp = this.arm.addComponent(new CookingArm());
    this.arm.addComponent(new ImageRenderComponent("Img", Cooking.arm));
    this.arm.addComponent(new InteractiveComponent("Arm interactable", this.armComp, this.armComp.onClick));
    this.arm.addComponent(new AttachToMouse("attach", -200,-400));
    this.addGameObject(this.arm);

    this.cookingZone = new GameObject(null, "CookingZone");
    this.cookingZone.setPositionVector(Cooking.CookPosition);
    let cookingZoneComp = this.cookingZone.addComponent(new CookingZone());
    this.addGameObject(this.cookingZone);

    let objectBG = SceneUtil.addImage(this, "Background", Cooking.background, 0,0,-3);

    this.bun = SceneUtil.addImage(this, "Bun", Cooking.bun, 1400,400,-2);

    //let objectPCooked = SceneUtil.addImage(this, "PCook", Cooking.pCooked, 100,400,-1);

    //let objectPRaw = SceneUtil.addImage(this, "PRaw", Cooking.pRaw, 1450,450,1);

    //this.arm = SceneUtil.addImage(this, "Arm", Cooking.arm, mouseX,mouseY,0);


    let objectBorder = SceneUtil.addImage(this, "border", Cooking.border, 0,0,2);

    this.catActivated = false;
    this.catObj = new GameObject(null, "Cat");
    this.catObj.setPosition(width*0.4,-50000);
    this.catObj.addComponent(new ImageRenderComponent("Img", Cooking.paw));
    this.catRotTimeline = this.catObj.addComponent(new RotationTimeline());
    this.catRotTimeline.addKeyDegree(0, -45);
    this.catRotTimeline.addKeyDegree(350, 60);
    //this.catRotTimeline.start();
    this.catPosTimeline = this.catObj.addComponent(new PositionTimeline());
    this.catPosTimeline.addKey(0, width*0.4,-1000,3);
    this.catPosTimeline.addKey(125, width*0.4,-500,3);
    this.catPosTimeline.addKey(350, width*0.4,-1000,1);
    //this.catPosTimeline.start();
    this.catEventTimeline = this.catObj.addComponent(new EventTimeline());
    this.catEventTimeline.addEvent(new EventCallback(125, this, this.onCatHit));
    this.catEventTimeline.addEvent(new EventSFX(0, Cooking.catMeow));
    this.addGameObject(this.catObj);

    this.catZoneObj = new GameObject(null, "CatZone");
    this.catZoneObj.setPosition(width*0.5,height*0.25);
    this.addGameObject(this.catZoneObj);

    if(Engine.DebugDrawOn){
      this.cookingZone.addComponent(new CircleRenderComponent("", Cooking.CookRadius));
      this.bun.addComponent(new CircleRenderComponent("", Cooking.BunRadius));
      this.paddy.addComponent(new CircleRenderComponent("", Cooking.PaddyRadius));
      this.catZoneObj.addComponent(new CircleRenderComponent("", Cooking.CatZoneRadius));
    }
  }

  isWinningCondition(){
    //paddy must not be picked up
    if(this.paddyComp.isPickedUp) return false;
    //paddy must be cooked
    if(!this.paddyComp.cooked) return false;
    //paddy must be inside the bun BunRadius
    let dist = this.paddy.distTo(this.bun);
    return dist < Cooking.BunRadius;
  }
  onCatHit(){
    this.armComp.drop();
  }
  onUpdate(){
    super.onUpdate();

    // cat logic only after first iteration
    if(this.game.cookingIteration > 1){
      if(!this.catActivated && this.paddyComp.isPickedUp){
        let dist = this.arm.distTo(this.catZoneObj);
        if(dist < Cooking.CatZoneRadius){
          this.catActivated = true;
          SceneUtil.StartAllTimelinesOnObject(this.catObj);
        }
      }
    }
  }

  onDraw(renderer){

  }



}
