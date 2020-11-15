
class SampleScene extends Scene{
  static background=0;
  static testSFX;
  static testSFX2;
  static onPreload(){
    SampleScene.background = loadImage('assets/images/1. start/startSplash.png');
    SampleScene.testSFX = loadSound('assets/sounds/menuTheme.mp3');
    SampleScene.testSFX2 = loadSound('assets/sounds/voiceOver/2. language selection/eng.mp3');
  }

  constructor(){
    super();
  }
  onSetup(){
    SceneUtil.addImage(this, "", MainMenu.background, 100,100, 0, 500, 200); // z at 0 will draw between -1 and 1
    SceneUtil.addImage(this, "", MainMenu.background, 150,150, 1, 500, 200); // z at 1 will draw on top
    SceneUtil.addImage(this, "", MainMenu.background, 50,200, -1, 500, 200); // z at -1 will draw bellow


    // this.myButton = SceneUtil.addImage(this, "", MainMenu.background, 800,400, 1, 200, 120); // z at -1 will draw bellow
    // SceneUtil.addRectCollisionToObject(this.myButton, 0,0,200,120);
    // SceneUtil.addButtonToObject(this.myButton, this, this.onButtonClick);

    // add a sound fx that will play right away
    this.mySFX = SceneUtil.addSFX(this, "", SampleScene.testSFX, true);


    // Create a button game object
    // named it "MyButton"
    this.myButton = new GameObject(null, "MyButton");
    this.myButton.setPosition(200,800);
    // add collision component. when mouse click in rectangle, button activate
    // the position of the rect is relative to the position of the game object
    this.myButton.addComponent(new RectangleCollision("rect", 0,0, 200, 100));
    // add an interactive component that will start all timeline component on the button
    this.myButton.addComponent(new ActivateTimelinesOnClick());

    // add an event timeline on the button
    let eventTimeline = this.myButton.addComponent(new EventTimeline());
    // add a sound FX event at 0 second.
    eventTimeline.addEvent( new EventSFX(0, SampleScene.testSFX2));
    // add an event at 1 second, will change scene to the Cooking scene
    eventTimeline.addEvent( new EventChangeScene(1000, new Cooking()));

    // add a position timeline on the button
    let posTimeline = this.myButton.addComponent(new PositionTimeline());
    // add 2 position key frame
    posTimeline.addKey(0, 200, 800);
    posTimeline.addKey(1000, 200, 1000);
    // add the button game object to the scene;
    this.addGameObject(this.myButton);


  }
  onButtonClick(posLocal, posWorld, event){
    console.log(event);
    if(this.mySFX.enabled){
      this.mySFX.deactivate();
    } else {
      this.mySFX.activate();
    }
  }
  onUpdate(){

  }

  onDraw(renderer){

  }
}
