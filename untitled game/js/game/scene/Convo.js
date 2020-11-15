class Convo extends Scene{
  static eyeRadius = 450;
  static playerOverlayWidth = 2651;
  static playerOverlayHeight = 1080;
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

  constructor(callbackObj, callbackFunc){
    super();
    this.callbackObj = callbackObj;
    this.callbackFunc = callbackFunc;
  }
  onSetup(){

    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    SceneUtil.addImage(this, 'background', Convo.background, 0,0,-2);

    SceneUtil.addImage(this, 'border', Convo.border,0,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);


    this.player = new GameObject(null, "Player");
    this.player.setPosition(width*0.5,0,1);
    this.player.addComponent(new ImageRenderComponent("player", Convo.player,-Convo.playerOverlayWidth*0.5,0)); //2651 x 1080
    //this.player.addComponent(new AttachToMouse("attach", 0,0));
    let eye0 = this.player.addChild(new GameObject(null, "eye"));
    eye0.setPosition(-Convo.playerOverlayWidth*0.18,Convo.playerOverlayHeight*0.5,1);
    let eye1 = this.player.addChild(new GameObject(null, "eye"));
    eye1.setPosition(Convo.playerOverlayWidth*0.20,Convo.playerOverlayHeight*0.5,1);
    //console.log("player has child=" +this.player.transform.children.length);
    this.addGameObject(this.player);

    this.arm = new GameObject(null, "Arm");
    let armComp = this.arm.addComponent(new ConvoArm());
    this.arm.addComponent(new ImageRenderComponent("ImgOpen", Convo.hOpen,-300,-500));
    this.arm.addComponent(new ImageRenderComponent("ImgClose", Convo.hClosed,-300,-200));
    this.arm.addComponent(new AttachToMouse("attach", 0,0));
    armComp.setClosed(false);
    this.addGameObject(this.arm);


    this.timerObject = new CountdownTimerObject();
    this.timerObject.setPosition(800,150,5);
    this.addGameObject(this.timerObject);

    this.resultMsgObject = new ResultMsgObject(this.callbackObj, this.callbackFunc);
    this.resultMsgObject.nextScene = new Driving();
    this.addGameObject(this.resultMsgObject);
    for(let i=0; i != 5; ++i){
      this.addSweat(random(400,1000), random(300,800),floor(random(0,2)));
    }


    if(Engine.DebugDrawOn){
      eye0.addComponent(new CircleRenderComponent("", Convo.eyeRadius));
      eye1.addComponent(new CircleRenderComponent("", Convo.eyeRadius));
    }
  }


  addSweat(x,y,type){

    let sweatGo = new GameObject(null, "Sweat");
    sweatGo.setPosition(x,y,0.5);
    let radius = 20;
    if(type == 0){
      sweatGo.name = "smallSweat";
      sweatGo.addComponent(new ImageRenderComponent("img", Convo.ss1,-16,-50));
      radius = 20;
    } else {
      sweatGo.name = "bigSweat";
      sweatGo.addComponent(new ImageRenderComponent("img", Convo.bs1,-40,-120));
      radius = 60;
    }
    sweatGo.addComponent(new SweatComponent(radius));

    if(Engine.DebugDrawOn){
      sweatGo.addComponent(new CircleRenderComponent("", radius));
    }
    this.addGameObject(sweatGo);

  }
  isWinningCondition(){

    let eyes = this.getAllGameObjectByName("eye");
    let sweats = this.getAllGameObjectComponentByName("Sweat");

    for(let iEye = 0; iEye != eyes.length; ++iEye){
      for(let iSweat = 0; iSweat != sweats.length; ++iSweat){
        let dist = sweats[iSweat].distTo(eyes[iEye]);
        if(dist < sweats[iSweat].radius + Convo.eyeRadius){
          return false;
        }
      }
    }
    return true;
  }
  onUpdate(){

    if(this.timerObject.isOver() && !this.resultMsgObject.isTimerActive()){
      //check if all the sweat are outside the eyes
      //this.resultMsgObject.setFail();
      let win = this.isWinningCondition();
      if(!win){
        this.resultMsgObject.setFail();
      } else {
        this.resultMsgObject.setSuccess();
      }
    }

  }

  onDraw(renderer){

  }
}

class SweatComponent extends GameObjectComponent{

  constructor(radius){
    super("Sweat");
    this.radius = radius;
  }

  setVisible(value){
    let renders = this.owner.getAllComponentWithFlag(RenderComponent.ID);
    console.log("renders =" + renders.length);
    for(let i = 0;i != renders.length; ++i){
      renders[i].enabled = value;
    }
  }
}
class ConvoArm extends InteractiveComponent{

  constructor(){
    super("ConvoArm");
    this.close = false;
    this.attachedSweat = null;
  }
  processMouseClick(posLocal, posWorld, event){
    return false;
  }
  processMousePressed(posLocal, posWorld, event){
    this.setClosed(true);
    let closest = this.getClosestSweat();
    if(closest != null){
      this.attachedSweat = closest;
      closest.setVisible(false);
      closest.owner.addComponent(new AttachToObject("attach", this.owner, this.vectorTo(closest)));
    }
    return false;
  }
  processMouseReleased(posLocal, posWorld, event){
    this.setClosed(false);
    if(this.attachedSweat != null){
      let attach = this.attachedSweat.owner.getFirstComponentByName("attach");
      if(attach != null){
        this.attachedSweat.setVisible(true);
        this.attachedSweat.owner.removeComponent(attach);
      }
    }
    return false;
  }
  getClosestSweat(){
    let sweats = this.getScene().getAllGameObjectComponentByName("Sweat");
    //console.log("there are that many sweat " + sweats.length);
    let minDist = 99999999;
    let minSweat = null;
    for(let i = 0; i != sweats.length; ++i){
      let dist = sweats[i].distTo(this);
      console.log(dist);
      if(dist < sweats[i].radius){
        if(dist < minDist){
          minDist = dist;
          minSweat = sweats[i];
        }
      }
    }

    return minSweat;
  }

  setClosed(value){
    this.close = value;

    let toTurnOff = this.owner.getFirstComponentByName("ImgOpen");
    let toTurnOn = this.owner.getFirstComponentByName("ImgClose");
    if(toTurnOff != null){
      toTurnOff.enabled = !value;
    }
    if(toTurnOn != null){
      toTurnOn.enabled = value;
    }
  }
}
