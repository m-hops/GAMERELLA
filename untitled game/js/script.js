
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
