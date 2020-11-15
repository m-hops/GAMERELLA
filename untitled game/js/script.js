


function getMouseVector(){
  return new p5.Vector(mouseX, mouseY, 0);
}

function preload(){
  SampleScene.onPreload();
  MainMenu.onPreload();
  Language.onPreload();
  Introduction.onPreload();
  PracticeMenu.onPreload();
  Cooking.onPreload();
  Driving.onPreload();
  Convo.onPreload();
  Ending.onPreload();
}

class Game{

  moveToNextGame(){
    let index = floor(random(0,2));
    console.log("moveToNextGame " + index);
    this.setNextGameByIndex(index);
  }
  setNextGameByIndex(index){

    switch(index){
      case 0:
        Engine.setScene(new Cooking(this, this.moveToNextGame));
        break;
      case 1:
        Engine.setScene(new Convo(this, this.moveToNextGame));
        break;
    }
  }
}
let game = new Game;


function setup() {
  createCanvas(1920, 1080);
  background(0);

  Engine.init();
  //Engine.setScene(new SampleScene());
  //Engine.setScene(new TestScene());
  //PositionTimeline
  //Engine.setScene(new MainMenu());
    //Engine.setScene(new Driving());
    //Engine.setScene(new Cooking());
    //Engine.setScene(new Convo());

  //game.setNextGameByIndex(1);
  Engine.setScene(new MainMenu());
}

function draw() {
  background(0);
  Engine.run();
  Engine.draw();
  // if(Engine.currentScene != null){
  //   Engine.currentScene.run();
  //   Engine.currentScene.draw(Engine.renderer);
  //   if(Engine.DebugDrawOn) Engine.currentScene.debugDraw(Engine.renderer);
  //
  //   Engine.renderer.render();
  // }
}

function mouseClicked(event) {
  Engine.mouseClicked(event);
}
function mousePressed(event) {
  Engine.mousePressed(event);
}
function mouseReleased(event) {
  Engine.mouseReleased(event);
}
class State{

  onEnter(SM){

  }
  onRun(SM){

  }
  onExit(SM){

  }
}
class StateMachine{
  constructor(target){
    this.currentState = null;
    this.target = target;
  }
  run(){
    if(this.currentState != null){
      this.currentState.onRun(this);
    }
  }
  transit(targetState){
    if(this.currentState != null){
      this.currentState.onExit(this);
    }
    this.currentState = targetState;
    this.currentState.onEnter(this);
  }
}
class StateMachineComponent extends GameObjectComponent{

    constructor(){
      this.stateMachine = new StateMachine(this);
    }

    run(){
      this.stateMachine.run();
    }
}

class AttachToMouse extends GameObjectComponent{

  constructor(name, x,y){
    super(name);
    this.x = x;
    this.y = y;
  }
  run(){
    let localMouse = getMouseVector();
    localMouse.x += this.x;
    localMouse.y += this.y;
    if(this.owner.transform.parent != null){
      localMouse = this.owner.transform.parent.world.inverseTransformVector(localMouse);
    }
    this.owner.transform.local.setPosition(localMouse.x, localMouse.y);
    //this.owner.transform.local.setPosition(mouseX, mouseY);
  }
}
class AttachToObject extends GameObjectComponent{

  constructor(name, targetObject, offset){
    super(name);
    this.targetObject = targetObject;
    this.offset = offset;
  }
  run(){
    this.owner.transform.local.set(this.targetObject.transform.world);
    if(this.offset != null){
      this.owner.transform.local.moveByVector(this.offset);
    }
  }
}
