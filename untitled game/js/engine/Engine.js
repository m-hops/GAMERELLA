
class Engine{
  static currentScene=null;
    static renderer=null;
  static setCurrentScene(scene){
    Engine.currentScene = scene;
    scene.onSetup();
    scene.start();

    Engine.renderer = new Renderer();
  }
}
