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
}


function setup() {
  createCanvas(1920, 1080);
  background(0);
  //Engine.setCurrentScene(new SampleScene());
  //Engine.setCurrentScene(new MainMenu());
  //Engine.setCurrentScene(new SampleScene());
  Engine.setCurrentScene(new Cooking());
}

function draw() {
  background(0);
  if(Engine.currentScene != null){
    Engine.currentScene.run();
    Engine.currentScene.draw(Engine.renderer);

    Engine.renderer.render();
  }
}

function mouseClicked(event) {
  let mouse = getMouseVector();
  if(Engine.currentScene != null){
    let interactables = Engine.currentScene.getAllComponentAndChildrenWithFlag(InteractiveComponent.ID);
    for(let i = 0;i != interactables.length; ++i){
      let colliders = interactables[i].owner.getAllComponentWithFlag(CollisionComponent.ID);
      let mouseLocal = interactables[i].owner.transform.world.inverseTransformVector(mouse);
      for(let iColl = 0;iColl != interactables.length; ++iColl){
        if(colliders[iColl].isLocalPointIn(mouseLocal)){
          if(interactables[i].processMouseClick(mouseLocal, mouse, event)){
            return;
          }
        }
      }
    }
    //let objs = Engine.currentScene.getAllObjectsCollidingAt(getMouseVector());
    //InteractiveComponent
  }
}
