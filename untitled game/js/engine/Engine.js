
class Engine{
  static DebugDrawOn = false;
  static currentScene=null;
  static nextScene=null;
  static renderer=null;
  static init(){

    Engine.renderer = new Renderer();
  }
  static setScene(scene){
    Engine.nextScene = scene;
  }

  static run(){

    if(Engine.nextScene != null){

      if(Engine.currentScene != null){
        Engine.currentScene.onDispose();
      }
      Engine.currentScene = Engine.nextScene;
      Engine.currentScene.onSetup();
      Engine.currentScene.start();
      Engine.nextScene = null;
    }

    if(Engine.currentScene != null){
      Engine.currentScene.run();
    }
  }
  static draw(){


    if(Engine.currentScene != null){
      Engine.currentScene.draw(Engine.renderer);
      if(Engine.DebugDrawOn) Engine.currentScene.debugDraw(Engine.renderer);

      Engine.renderer.render();
    }
  }



  static mouseClicked(event) {
    let mouse = getMouseVector();
    if(Engine.currentScene != null){
      let interactables = Engine.currentScene.getAllComponentAndChildrenWithFlag(InteractiveComponent.ID);
      console.log("interactables count=" + interactables.length);
      for(let i = 0;i != interactables.length; ++i){
        let mouseLocal = interactables[i].owner.transform.world.inverseTransformVector(mouse);
        let colliders = interactables[i].owner.getAllComponentWithFlag(CollisionComponent.ID);
        if(colliders.length == 0){
          console.log("click on " + interactables[i].name);
          if(interactables[i].processMouseClick(mouseLocal, mouse, event)){
            return;
          }
        } else {
          for(let iColl = 0;iColl != interactables.length; ++iColl){
            if(colliders[iColl].isLocalPointIn(mouseLocal)){
              if(interactables[i].processMouseClick(mouseLocal, mouse, event)){
                return;
              }
            }
          }
        }
      }
      //let objs = Engine.currentScene.getAllObjectsCollidingAt(getMouseVector());
      //InteractiveComponent
    }
  }
}
