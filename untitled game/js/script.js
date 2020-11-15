
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
}


function setup() {
  createCanvas(1920, 1080);
  background(0);
  Engine.init();
  //Engine.setCurrentScene(new SampleScene());
  //Engine.setCurrentScene(new MainMenu());
  //Engine.setCurrentScene(new Driving());
  Engine.setScene(new Cooking());
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
  // let mouse = getMouseVector();
  // if(Engine.currentScene != null){
  //   let interactables = Engine.currentScene.getAllComponentAndChildrenWithFlag(InteractiveComponent.ID);
  //   console.log("interactables count=" + interactables.length);
  //   for(let i = 0;i != interactables.length; ++i){
  //     let mouseLocal = interactables[i].owner.transform.world.inverseTransformVector(mouse);
  //     let colliders = interactables[i].owner.getAllComponentWithFlag(CollisionComponent.ID);
  //     if(colliders.length == 0){
  //       console.log("click on " + interactables[i].name);
  //       if(interactables[i].processMouseClick(mouseLocal, mouse, event)){
  //         return;
  //       }
  //     } else {
  //       for(let iColl = 0;iColl != interactables.length; ++iColl){
  //         if(colliders[iColl].isLocalPointIn(mouseLocal)){
  //           if(interactables[i].processMouseClick(mouseLocal, mouse, event)){
  //             return;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   //let objs = Engine.currentScene.getAllObjectsCollidingAt(getMouseVector());
  //   //InteractiveComponent
  // }
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
