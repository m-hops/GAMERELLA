
"use strict"




function preload(){
  GameScene.onPreload();
  Game.onPreload();
  SampleScene.onPreload();
  MainMenu.onPreload();
  Language.onPreload();
  Introduction.onPreload();
  PracticeMenu.onPreload();
  Cooking.onPreload();
  Driving.onPreload();
  Convo.onPreload();
  Ending.onPreload();
  ConvoIntro.onPreload();
  CookingIntro.onPreload();
  Creepy.onPreload();
}
function windowResized() {
  Screen.ResizeCanvas();
}
let game;// = new Game();
function setup() {
  Screen.CreateCanvas();
  background(0);

  Engine.init();

  game = new Game();
  game.start();
  //Engine.setScene(new Ending());
  //game.cookingIteration = 0;
  //game.moveToNextGame();

  //Engine.setScene(new SampleScene());
  //Engine.setScene(new TestScene());
  //PositionTimeline
  //Engine.setScene(new MainMenu());
  //Engine.setScene(new Driving());
  //Engine.setScene(new Cooking());
  //Engine.setScene(new Convo());

  //game.setNextGameByIndex(0);
  //game.moveToNextGame();
  //Engine.setScene(new MainMenu());

  //Engine.setScene(new Introduction());

  //game.cookingIteration = 2;
  //game.setNextGameByIndex(0);
}

function draw() {

  background(0);
  Engine.run();

  push();
  Screen.applyTransform();
  Engine.draw();
  pop();
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

class ShakeComponent extends GameObjectComponent{

  constructor(name, speed, radius){
    super(name);
    this.target = new p5.Vector(0,0,0);
    this.current = new p5.Vector(0,0,0);
    this.speed = speed;
    this.radius = 50;
    this.selectNewTarget();
  }
  selectNewTarget(){

    let angle = random(0,2*PI);
    let radius = random(this.radius*0.2, this.radius);
    this.target = p5.Vector.fromAngle(angle, radius);

  }
  run(){
    let diff = p5.Vector.sub(this.target, this.current);
    let l = diff.mag();
    let moveDist = this.speed*deltaTime/1000;
    if(moveDist >= l){
      //reach target
      this.selectNewTarget();
    }
    diff.setMag(moveDist);
    this.current.add(diff);
    this.owner.transform.local.moveByVector(this.current);

  }
}
class AttachToMouse extends GameObjectComponent{

  constructor(name, x,y){
    super(name);
    this.x = x;
    this.y = y;
  }
  run(){
    let localMouse = Screen.getMouseVector();
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
