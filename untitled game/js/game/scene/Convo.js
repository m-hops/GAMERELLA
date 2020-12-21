
class ConvoConfig extends MiniGameConfig{
  constructor(){
    super();
    this.time = 10*1000;
    this.hasAnts = false;
    this.hasBlink = false;
    this.ConvoSpeed = 1;
  }

  createScene(game){
    return new Convo(this, game)
  }
};

class Convo extends GameScene{
  static eyeRadius = 400;
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
  static talkSFX;
  static sweatSFX;
  static antSFX;
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

    Convo.talkSFX = loadSound('assets/sounds/voiceOver/Convo/ambience.mp3');
    Convo.sweatSFX = loadSound('assets/sounds/sfx/convo/bubble.mp3');
    Convo.antSFX = loadSound('assets/sounds/sfx/convo/ant.mp3');
  }

  constructor(config, game = Game.instance){
    super(game);
    this.config = config;
  }
  onSetup(){
    super.onSetup();
    // let timeRatio = (5 - (this.game.convoIteration-1)) / 5.0;
    // timeRatio = constrain(timeRatio, 0, 1);
    // this.setTimer(5000 + 5000 * timeRatio);
    this.setTimer(this.config.time);
    // z at 0 will draw between -1 and 1
    // z at 1 will draw on top
    // z at -1 will draw bellow
    let bgObj = SceneUtil.addImage(this, 'background', Convo.background, 0,0,-2);
    // let talkSFX = bgObj.addComponent(new SFXComponent(null, Convo.talkSFX));
    // talkSFX.rate = this.config.ConvoSpeed;//1 + (1-timeRatio) * 1.5;

    SceneUtil.addImage(this, 'border', Convo.border,0,0,2);

    // let myTextObject = SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 'arial', 175,200, 2, 500, 200); // z at -1 will draw bellow
    // myTextObject.setScale(10,10);


    this.player = new GameObject(null, "Player");
    this.player.setPosition(Screen.refWidth*0.5,0,1);
    this.player.addComponent(new ImageRenderComponent("player", Convo.player,-Convo.playerOverlayWidth*0.5,0)); //2651 x 1080
    //this.player.addComponent(new AttachToMouse("attach", 0,0));
    let eye0 = this.player.addChild(new GameObject(null, "eye"));
    eye0.setPosition(-Convo.playerOverlayWidth*0.18,Convo.playerOverlayHeight*0.5,1);
    let eye1 = this.player.addChild(new GameObject(null, "eye"));
    eye1.setPosition(Convo.playerOverlayWidth*0.21,Convo.playerOverlayHeight*0.5,1);
    //console.log("player has child=" +this.player.transform.children.length);
    this.addGameObject(this.player);

    this.arm = new GameObject(null, "Arm");
    let armComp = this.arm.addComponent(new ConvoArm());
    this.arm.addComponent(new ImageRenderComponent("ImgOpen", Convo.hOpen,-300,-500));
    this.arm.addComponent(new ImageRenderComponent("ImgClose", Convo.hClosed,-300,-200));
    this.arm.addComponent(new AttachToMouse("attach", 0,0));
    armComp.setClosed(false);
    this.addGameObject(this.arm);


    let antCount = 0;
    for(let i=0; i != 6; ++i){
      let angle = random(0,2*PI);
      let radius = random(Convo.eyeRadius*0.2, Convo.eyeRadius);
      let v = p5.Vector.fromAngle(angle, radius);
      if(random(0,2) < 1){
        v = p5.Vector.add(eye0.getPosition(), v);
      } else {
        v = p5.Vector.add(eye1.getPosition(), v);
      }
      let sweatType = floor(random(0,2));
      if(this.config.hasAnts){
        if(antCount == 0){
          sweatType = 2;
          ++antCount;
        } else {
          let antR = random(0,100);
          let antChance = 0.2;//-10 + game.convoIteration*10;
          antChance = constrain(antChance, 0, 80);
          if(antR < antChance){
            sweatType = 2;
            ++antCount;
          }
        }
      }

      this.addSweat(v.x, v.y , sweatType);
    }


    if(Engine.DebugDrawOn){
      eye0.addComponent(new CircleRenderComponent("", Convo.eyeRadius));
      eye1.addComponent(new CircleRenderComponent("", Convo.eyeRadius));
    }
  }


  addSweat(x,y,type){

    let sweatGo = new GameObject(null, "Sweat");
    sweatGo.setPosition(x,y,0.5);
    let sweatComp = sweatGo.addComponent(new SweatComponent(20));
    switch(type){
      case 0:
        sweatGo.name = "smallSweat";
        sweatGo.addComponent(new ImageRenderComponent("img", Convo.ss1,-16,-50));
        sweatComp.radius = 20;
        sweatComp.sfx = Convo.sweatSFX;
        break;
      case 1:
        sweatGo.name = "bigSweat";
        sweatGo.addComponent(new ImageRenderComponent("img", Convo.bs1,-40,-120));
        sweatComp.radius = 60;
        sweatComp.sfx = Convo.sweatSFX;
        break;
      case 2:
        sweatGo.name = "ant";
        sweatGo.addComponent(new ImageRenderComponent("img", Convo.ant1,-150,-100));
        sweatComp.radius = 80;
        sweatComp.speed = 0;
        sweatComp.sfx = Convo.antSFX;
        break;
    }

    if(Engine.DebugDrawOn){
      sweatGo.addComponent(new CircleRenderComponent("", sweatComp.radius));
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
    super.onUpdate();

  }

  onDraw(renderer){

  }
}

class SweatComponent extends GameObjectComponent{

  constructor(radius){
    super("Sweat");
    this.radius = radius;
    this.speed = random(2,5);
    this.sfx = null;
  }
  run(){
    //console.log("SweatComponent" + this.owner.transform.local.y);
    this.owner.transform.local.position.y += deltaTime/1000 * this.speed;
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
      if(closest.sfx != null) closest.sfx.play();
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
