/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/







function preload(){
  SampleScene.onPreload();
  MainMenu.onPreload();
}


function setup() {
  createCanvas(1920, 1080);
  background(0);
  //Engine.setCurrentScene(new SampleScene());
  Engine.setCurrentScene(new MainMenu());
}

function draw() {
  background(0);
  if(Engine.currentScene != null){
    Engine.currentScene.run();
    Engine.currentScene.draw(Engine.renderer);

    Engine.renderer.render();
  }
}
