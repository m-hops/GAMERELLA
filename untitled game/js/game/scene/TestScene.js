
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
