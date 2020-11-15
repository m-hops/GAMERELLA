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
  start(){
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      this.rootGameObjects[i].start();
    }
  }
  run(){
    this.onUpdate();
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      if(this.rootGameObjects[i].enabled){
        this.rootGameObjects[i].run();
      }
    }

    this.onPostUpdate();
  }

  getFirstGameObjectByName(name, onlyActive=false){
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      if(this.rootGameObjects[i].name == name){
        return this.rootGameObjects[i];
      }
    }
    return null;
  }
  getAllGameObjectByName(name, onlyActive=false, lookInChildren=true){
    let result = [];
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      let resultInRoot = this.rootGameObjects[i].getAllGameObjectByName(name, onlyActive, lookInChildren);
      if(resultInRoot.length > 0){
        result = result.concat(resultInRoot);
      }
    }
    return result;
  }
  getFirstGameObjectComponentByName(name, onlyActive=false, lookInChildren=true){
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      let result = this.rootGameObjects[i].getFirstComponentByName(name, onlyActive, lookInChildren);
      if(result != null) return result;
    }
    return null;
  }
  getAllGameObjectComponentByName(name, onlyActive=false, lookInChildren=true){
    let result = [];
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      let resultInRoot = this.rootGameObjects[i].getAllComponentByName(name, onlyActive, lookInChildren);
      if(resultInRoot.length > 0){
        result = result.concat(resultInRoot);
      }
    }
    return result;
  }

  getAllComponentWithFlag(flag, onlyActive=false, lookInChildren=true){
    let result = [];
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      let resultInRoot = this.rootGameObjects[i].getAllComponentWithFlag(flag, onlyActive, lookInChildren);
      if(resultInRoot.length > 0){
        result = result.concat(resultInRoot);
      }
    }
    return result;
  }

  getAllObjectsCollidingAtUnder(result, object, point, onlyActive=false){
    if(!onlyActive || object.enabled){
      let collisionComponents = object.getAllComponentWithFlag(CollisionComponent.ID);
      if(collisionComponents.length > 0){
        let pointLocal = object.transform.world.inverseTransformVector(point);
        //console.log(point + ":" + pointLocal);
        for(let i = 0; i != collisionComponents.length; ++i){
          if(collisionComponents[i].isLocalPointIn(pointLocal)){
            result.push(object);
            break;
          }
        }
      }
      // look in children
      for(let i = 0; i != object.transform.children.length; ++i){
        this.getAllObjectsCollidingAtUnder(result, object.transform.children[i].owner, point, onlyActive);
      }
    }
  }
  getAllObjectsCollidingAt(point, onlyActive=false){
    let result = [];
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      this.getAllObjectsCollidingAtUnder(result, this.rootGameObjects[i], point, onlyActive);
    }
    return result;
  }

  prepareObjectDraw(object, renderer){
    // update all gameobjects' transform
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      this.rootGameObjects[i].updateTransform();
    }
    if(object.enabled){
      let renderComponents = object.getAllComponentWithFlag(RenderComponent.ID);
      for(let i = 0; i != renderComponents.length; ++i){
        renderer.addDraw(renderComponents[i]);
      }
      // let rc = object.getFirstComponentWithFlag(RenderComponent.ID);
      // if(rc != null){
      //   renderer.addDraw(rc);
      // }
      //add children game objects' RenderComponent
      for(let i = 0; i != object.transform.children.length; ++i){
        this.prepareObjectDraw(object.transform.children[i].owner, renderer);
      }
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

  debugDraw(renderer){
    for(let i = 0; i != this.rootGameObjects.length; ++i){
      this.rootGameObjects[i].debugDraw(renderer);
    }
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

  onDispose(){

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
