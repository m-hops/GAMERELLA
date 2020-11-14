
class Engine{
  static currentScene=null;
    static renderer=null;
  static setCurrentScene(scene){
    scene.onSetup();
    Engine.currentScene = scene;
    Engine.renderer = new Renderer();
  }
}
