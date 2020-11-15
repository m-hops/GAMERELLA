
class TestScene extends Scene{
  static background=0;
  static testSFX;
  static onPreload(){
    TestScene.background = loadImage('assets/images/1. start/startSplash.png');
    TestScene.testSFX = loadSound('assets/sounds/menuTheme.mp3')
  }

  constructor(){
    super();
    this.goTestSFX = null;
  }
  onSetup(){
    this.testGo = new GameObject(null,"root");
    this.testGo.transform.local.setPosition(10,50);
    this.testGo.transform.local.setScale(2,2);
    this.testGo.transform.local.rotation = 0.25 * PI;
    this.testGo.addComponent(new RenderComponent());
    this.testGoChild0 = new GameObject(this.testGo, "test child");
    this.testGoChild0.transform.local.rotation = -0.25 * PI;
    this.testGoChild0.transform.local.setPosition(50,0);
    this.testGoChild0.transform.local.setScale(2,2);
    this.testGoChild0.addComponent(new RenderComponent());

    this.addGameObject(this.testGo);

    SceneUtil.addImage(this, "", MainMenu.background, 100,100, 0, 500, 200); // z at 0 will draw between -1 and 1
    SceneUtil.addImage(this, "", MainMenu.background, 150,150, 1, 500, 200); // z at 1 will draw on top
    SceneUtil.addImage(this, "", MainMenu.background, 50,200, -1, 500, 200); // z at -1 will draw bellow


    //SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), "arial", 175,200, 2, 500, 200); // z at -1 will draw bellow

    let debugTextGO = new GameObject(null,"debugText");
    debugTextGO.transform.local.setPosition(175,200,2);
    this.debugTextComp = new TextRenderComponent("text", "Allo Allo", color(0, 0, 255), "arial", 500, 200);
    debugTextGO.addComponent(this.debugTextComp);
    this.addGameObject(debugTextGO);

    this.testAABB = new GameObject(null,"aabb");
    this.testAABB.transform.local.setPosition(800,200, 2);
    //this.testAABB.transform.local.setScale(2,2);
    this.testAABB.transform.local.rotation = 0.25 * PI;
    this.testAABB.addComponent(new RectangleCollision(null, -25,-25,100,100));
    this.testAABB.addComponent(new InteractiveComponent(null, this, this.onButtonClick));
    this.addGameObject(this.testAABB);

    this.goTestSFX = new GameObject(null,"testSFX");
    this.goTestSFX.enabled = false;
    this.goTestSFX.addComponent(new SFXComponent(null, TestScene.testSFX));
    this.addGameObject(this.goTestSFX);

    this.testTimeline = new GameObject(null,"testTimeline");
    let posTimeline = this.testTimeline.addComponent(new PositionTimeline());
    posTimeline.addKey(500, 200,0,2);
    posTimeline.addKey(1000, 300,0,2);
    posTimeline.addKey(10000, 200,500,2);
    posTimeline.start();
    let rotTimeline = this.testTimeline.addComponent(new RotationTimeline());
    rotTimeline.addKeyDegree(0, 0);
    rotTimeline.addKeyDegree(1000, 270);
    rotTimeline.addKeyDegree(10000, 5);
    rotTimeline.start();
    let scaleTimeline = this.testTimeline.addComponent(new ScaleTimeline());
    scaleTimeline.addKey(0, 1,1,1);
    scaleTimeline.addKey(1000, 2,2,1);
    scaleTimeline.addKey(10000, 10,1,1);
    scaleTimeline.start();
    this.addGameObject(this.testTimeline);


    this.testTimelineButton = new GameObject(null,"testTimelineButton");
    this.testTimelineButton.transform.local.setPosition(500,500, 2);
    this.testTimelineButton.addComponent(new RectangleCollision(null, -25,-25,100,100));
    this.testTimelineButton.addComponent(new ActivateTimelinesOnClick());
    let eventTimeline = this.testTimelineButton.addComponent(new EventTimeline());
    eventTimeline.addEvent( new EventChangeScene(1000, new SampleScene()));
    let posTimelineButton = this.testTimelineButton.addComponent(new PositionTimeline());
    posTimelineButton.addKey(0, 500,500,2);
    posTimelineButton.addKey(1000, 1000,500,2);
    this.addGameObject(this.testTimelineButton);

  }
  onButtonClick(posLocal, posWorld, event){
    //console.log(event);
    if(this.goTestSFX.enabled){
      this.goTestSFX.deactivate();
    } else {
      this.goTestSFX.activate();
    }
  }
  onUpdate(){

    this.testAABB.transform.local.rotation += 0.01 * PI;
    this.testGo.transform.local.setPosition(mouseX, mouseY);
    this.testGo.transform.local.rotation += 0.01 * PI;
    this.debugTextComp.text = "mouse=" + getMouseVector();
      //console.log(getMouseVector());
      // let objs = this.getAllObjectsCollidingAt(getMouseVector());
      // for(let i =0; i != objs.length;++i){
      //   console.log("Object collising with mouse " + objs[i].name);
      // }
  }

  onDraw(renderer){

  }
}
