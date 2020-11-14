/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
class Transform{
  constructor(){
    this.position = new p5.Vector(0,0,0);
    this.scale = new p5.Vector(1,1,1);
    this.rotation = 0;
  }
  transformed(transform){
    let result = new Transform();
    result.position = this.position.copy();
    result.position.mult(transform.scale);
    result.position.rotate(transform.rotation)
    result.position.add(transform.position);

    result.scale = this.scale.copy();
    result.scale.mult(transform.scale);

    result.rotation = this.rotation + transform.rotation;

      // console.log(
      //   "pos=" + this.position
      //     + "\n scale=" + this.scale
      //     + "\n rotation=" + this.rotation
      //   + "\ntransformed by \n pos=" + transform.position
      //   + "\n scale=" + transform.scale
      //   + "\n rotation=" + transform.rotation
      //   + "\nequals\n pos=" + result.position
      //   + "\n scale=" + result.scale
      //   + "\n rotation=" + result.rotation);
    return result;
  }
  setPosition(x,y,z=this.position.z){
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }
  setScale(x,y){
    this.scale.x = x;
    this.scale.y = y;
  }
  move(x,y){
    this.position.x += x;
    this.position.y += y;
  }
  apply(){
    //console.log("apply transform\n pos=" + this.position
    //  + "\n scale=" + this.scale
    //  + "\n rotation=" + this.rotation);
    angleMode(RADIANS);
    translate(this.position);
    scale(this.scale);
    rotate(this.rotation);
  }
}



class BaseObject{
  constructor(){
    this.id = -1;
  }
  is(flag){
    return false;
  }
  serialize(reg){
    let memento = {};
    memento.id = this.id;
    return memento;
  }
  deserialize(memento, reg){
    this.id = memento.id;
  }
};

class TransformNode extends BaseObject{
  constructor(owner, parent = null){
    super();
    this.owner = owner;
    this.local = new Transform();
    this.world = new Transform();

    this.children = [];
    this.parent = parent;
  }
  addChild(node){
    //console.log("add child " + node.constructor.name);
    if(node.parent != null){
      node.parent.removeChild(go);
    }
    node.parent = this;
    this.children.push(node);
  }
  removeChild(node){
    let index = this.children.indexOf(node);
    if(index>=0){
      this.children.splice(index,1);
      node.parent = null;
    }
  }
  update(){
    if(this.parent != null){
      this.world = this.local.transformed(this.parent.world);
    } else {
      this.world = this.local;
    }
  }
  updateAll(){
    this.update();
    for(let i = 0; i != this.children.length; ++i){
      this.children[i].updateAll();
    }
  }
  serialize(reg){
    let memento = super.serialize(reg);
    memento.local = this.local;
    memento.children = [];
    //memento.parent = parent;
    for(let i = 0; i != this.children.length; ++i){
      memento.children.push(this.children[i].serialize(reg));
    }
    return memento;
  }

}

class GameObjectComponent extends BaseObject{

  constructor(owner = null){
    super();
    this.owner = owner;
  }
}
class RenderComponent extends GameObjectComponent{
  static ID = 9999;
  constructor(owner=null){
    super(owner);
      this.owner = owner;
  }
  getTransform(){
    return this.owner.transform;
  }
  is(flag){
    return flag === RenderComponent.ID;
  }
  setOwner(owner){
    this.owner = owner;
  }

  applyTransform(){
    this.owner.transform.world.apply();
  }
  draw(renderer){
    //console.log("Draw RenderComponent");
    push();
    this.owner.transform.world.apply();
    stroke(255, 204, 0);
    noFill();
    //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
    rect(-10, -10, 20, 20)
    pop();
  }
}

class ImageRenderComponent extends RenderComponent{

  constructor(img, w=100, h=100){
    super();
    this.w = w;
    this.h = h;
    this.img = img;
  }
  draw(renderer){
    //console.log("Draw ImageRenderComponent");
    push();
    this.applyTransform();
    //stroke(255, 204, 0);
    //noFill();
    //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
    //rect(0, 0, this.w, this.h);
    image(this.img, 0, 0, this.w, this.h)
    pop();
  }
}
class TextRenderComponent extends RenderComponent{

  constructor(text, color, font, w=1000, h=1000){
    super();
    this.text = text;
    this.w = w;
    this.h = h;
    this.color = color;
    this.font = font;
  }
  draw(renderer){
    //console.log("Draw ImageRenderComponent");
    push();
    this.applyTransform();
    //stroke(255, 204, 0);
    //noFill();
    //rect(this.transform.world.position.x - 10, this.transform.world.position.y - 10, 20, 20)
    //rect(0, 0, this.w, this.h);
    if(this.color != color) fill(this.color);
    if(this.font != null) textFont(this.font);
    text(this.text, 0, 0, this.w, this.h)
    pop();
  }
}
class GameObject extends BaseObject{

  constructor(parent = null, name = ""){
    super();
    this.transform = new TransformNode(this);
    this.components = [];
    this.scene = null;
    this.name = name;
    if(parent != null){
      parent.transform.addChild(this.transform);
    }
  }

  addComponent(comp){
    //console.log("add comp " + comp.constructor.name);
    if(comp.owner != null){
      comp.owner.removeChild(go);
    }
    comp.setOwner(this);
    //console.log("add comp " + comp.constructor.name + " to " + comp.owner.name);
    this.components.push(comp);
  }
  removeComponent(comp){
    let index = this.components.indexOf(comp);
    if(index>=0){
      this.components.splice(index,1);
      comp.owner = null;
    }
  }
  getFirstComponentWithFlag(flag){
    for(let i = 0; i != this.components.length; ++i){
      if(this.components[i].is(flag)){
        return this.components[i];
      }
    }
    return null;
  }

  setPosition(x,y){
    this.transform.local.position.x = x;
    this.transform.local.position.y = y;
  }
  setScale(x,y){
    this.transform.local.scale.x = x;
    this.transform.local.scale.y = y;
  }



  run(){

  }

  updateTransform(renderer){
    this.transform.updateAll();
  }
  serialize(reg){
    let memento = super.serialize(reg);
    memento.transform = this.transform.serialize(reg);
    memento.comp = [];
    // for(let i = 0; i != this.rootGameObjects.length; ++i){
    //   memento.objs.push(this.rootGameObjects[i].serialize());
    // }
    return memento;
  }

};

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

class Renderer{
  constructor(){
      this.objectsToDraw = [];
  }
  addDraw(obj){
    //console.log("add object " + go.name)
    this.objectsToDraw.push(obj);
  }

  render(){
    //console.log("Rendering " + this.objectsToDraw.length + " render components");
    // sort by z
    this.objectsToDraw.sort(function(a, b){return a.getTransform().world.position.z - b.getTransform().world.position.z})

    for(let i = 0; i != this.objectsToDraw.length; ++i){
      this.objectsToDraw[i].draw(this);
    }
    this.objectsToDraw = [];
  }
}
class Registry{

  constructor(){
    this.index = 0;
    this.entries = [];
  }
  register(obj){
    obj.id = this.index;
    ++this.index;
    this.entries[obj.id] = obj;
    return obj;
  }
  getOrRegister(obj){
    if(obj.id >= 0){
      let index = indexOf(obj);
      if(index >=0) return obj;
    }

    return register(obj);
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


class Engine{
  static currentScene=null;
    static renderer=null;
  static setCurrentScene(scene){
    scene.onSetup();
    Engine.currentScene = scene;
    Engine.renderer = new Renderer();
  }
}



class SceneUtil{
  static addImage(scene, img, x, y, z, w, h){
    let go = new GameObject(null,"img");
    go.transform.local.setPosition(x,y,z);
    go.transform.local.setScale(1,1);
    go.transform.local.rotation = 0;
    let imgComp = new ImageRenderComponent(img, w,h);
    go.addComponent(imgComp);

    scene.addGameObject(go);
    return go;
  }

  static addText(scene, text, color, font, x, y, z, w, h){
    let go = new GameObject(null,"img");
    go.transform.local.setPosition(x,y,z);
    go.transform.local.setScale(1,1);
    go.transform.local.rotation = 0;
    let comp = new TextRenderComponent(text, color, font, w,h);
    go.addComponent(comp);

    scene.addGameObject(go);
    return go;
  }
}
