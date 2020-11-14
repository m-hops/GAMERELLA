class Scene extends BaseObject{

  constructor(parent = null){
    super();
    this.gameObjects = [];
    this.rootGameObjects = [];
  }

  addGameObject(go){

    if(go.scene != null){
      go.scene.removeGameObject(go);
    }
    go.scene = this;
    this.rootGameObjects.push(go);
    //this.gameObjects.push(go);
  }
  removeGameObject(go){
    let index = this.rootGameObjects.indezOf(go);
    if(index>=0){
      this.rootGameObjects.splice(index,1);
      go.scene = null;
    }
  }

  run(){
    this.onUpdate();
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      this.rootGameObjects[i].run();
    }

    this.onPostUpdate();
  }

  prepareObjectDraw(object, renderer){
    // update all gameobjects' transform
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      this.rootGameObjects[i].updateTransform();
    }


    let rc = object.getFirstComponentWithFlag(RenderComponent.ID);
    if(rc != null){
      renderer.addDraw(rc);
    }
    //add children game objects' RenderComponent
    for(let i = 0; i != object.transform.children.length; ++i){
      this.prepareObjectDraw(object.transform.children[i].owner, renderer);
    }
  }
  draw(renderer){

    this.onDraw(renderer);
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      //this.rootGameObjects[i].prepareDraw(renderer);
      this.prepareObjectDraw(this.rootGameObjects[i], renderer);
    }

    this.onPostDraw(renderer);
  }
  serialize(reg){
    let memento = super.serialize(reg);
    memento.objs = [];
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      memento.objs.push(this.rootGameObjects[i].serialize(reg));
    }
    return memento;
  }
  deserialize(memento, reg){

    // for(let i = 0; i != memento.objs.length; ++i){
    //
    //   memento.objs[i];
    // }
  }

  onSetup(){

  }
  onPostUpdate(){

  }
  onUpdate(){

  }
  onPostDraw(renderer){

  }
  onDraw(renderer){

  }
}



// let currentScene=null;
// let renderer = null;
// let reg = null;
//
// function setCurrentScene(scene){
//   scene.onSetup();
//   currentScene = scene;
// }
