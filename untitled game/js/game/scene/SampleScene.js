
class SampleScene extends Scene{
  static background=0;
  static onPreload(){
    SampleScene.background = loadImage('assets/images/1. start/startSplash.png');
  }

  constructor(){
    super();
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

    SceneUtil.addImage(this, MainMenu.background, 100,100, 0, 500, 200); // z at 0 will draw between -1 and 1
    SceneUtil.addImage(this, MainMenu.background, 150,150, 1, 500, 200); // z at 1 will draw on top
    SceneUtil.addImage(this, MainMenu.background, 50,200, -1, 500, 200); // z at -1 will draw bellow

    SceneUtil.addText(this, "Allo Allo", color(0, 0, 255), 175,200, 2, 500, 200); // z at -1 will draw bellow

  }

  onUpdate(){

    this.testGo.transform.local.setPosition(mouseX, mouseY);
    this.testGo.transform.local.rotation += 0.01 * PI;
  }

  onDraw(renderer){

  }
}
