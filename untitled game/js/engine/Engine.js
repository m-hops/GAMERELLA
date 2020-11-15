
class Engine{
  static currentScene=null;
    static renderer=null;
  static setCurrentScene(scene){
    if(Engine.currentScene != null){
      Engine.currentScene.onDispose();
    }
    Engine.currentScene = scene;
    scene.onSetup();
    scene.start();

    Engine.renderer = new Renderer();
  }
}
