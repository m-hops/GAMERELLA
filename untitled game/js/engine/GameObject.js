
class GameObject extends BaseObject{

  constructor(parent = null, name = ""){
    super();
    this.transform = new TransformNode(this);
    this.components = [];
    this.scene = null;
    this.name = name;
    this.enabled = true;
    if(parent != null){
      parent.transform.addChild(this.transform);
    }
  }

  addComponent(comp){
    //console.log("add comp " + comp.constructor.name);
    if(comp.owner != null){
      comp.owner.removeChild(comp);
    }
    comp.setOwner(this);
    //console.log("add comp " + comp.constructor.name + " to " + comp.owner.name);
    this.components.push(comp);
    return comp;
  }
  removeComponent(comp){
    let index = this.components.indexOf(comp);
    if(index>=0){
      this.components.splice(index,1);
      comp.owner = null;
    }
  }

  getFirstComponentByName(name, onlyEnabled=false){
    if(onlyEnabled && !this.enabled) return null;
    for(let i = 0; i != this.components.length; ++i){
      if( (!onlyEnabled || this.components[i].enabled)
          && this.components[i].name == name){
        return this.components[i];
      }
    }
    return null;
  }
  getFirstComponentAndChildByName(name, onlyEnabled=false){
    if(onlyEnabled && !this.enabled) return null;
    let result = this.getFirstComponentByName(name, onlyEnabled);
    if(result != null) return result;

    // check in children
    for(let i = 0; i != this.transform.children.length; ++i){
      if(!onlyEnabled || this.transform.children[i].owner.enabled){
        result = this.transform.children[i].owner.getFirstComponentAndChildByName(name, onlyEnabled);
        if(result != null) return result;
      }
    }

    return null;
  }
  getFirstComponentWithFlag(flag){
    for(let i = 0; i != this.components.length; ++i){
      if(this.components[i].is(flag)){
        return this.components[i];
      }
    }
    return null;
  }
  getAllComponentWithFlag(flag){
    let result=[];
    for(let i = 0; i != this.components.length; ++i){
      if(this.components[i].is(flag)){
        result.push(this.components[i]);
      }
    }
    return result;
  }

  getAllComponentAndChildrenWithFlag(flag, onlyActive=false){
    if(!onlyActive || this.enabled){
      let result=this.getAllComponentWithFlag(flag);
      for(let i = 0; i != this.transform.children.length; ++i){
        if(!onlyActive || this.transform.children[i].owner.enabled){
          let resultChildren = this.transform.children[i].owner.getAllComponentAndChildrenWithFlag(flag, onlyActive);
          if(resultChildren.length > 0){
            result = result.concat(resultChildren);
          }
        }
      }
      return result;
    }
    return [];
  }

  setPositionVector(v){
    this.transform.local.position = v.copy();
  }
  setPosition(x,y,z=this.transform.local.position.z){
    this.transform.local.position.x = x;
    this.transform.local.position.y = y;
  }
  getPosition(){
    return this.transform.world.position;
  }
  setScale(x,y){
    this.transform.local.scale.x = x;
    this.transform.local.scale.y = y;
  }
  start(){
    if(this.enabled){
      for(let i = 0; i != this.components.length; ++i){
        this.components[i].onActivate();
      }
      for(let i = 0; i != this.transform.children.length; ++i){
        this.transform.children[i].owner.start();
      }
    }
  }
  activate(){
    if(!this.enabled){
      for(let i = 0; i != this.transform.children.length; ++i){
        this.transform.children[i].owner.activate();
      }
      for(let i = 0; i != this.components.length; ++i){
        this.components[i].onActivate();
      }
    }
    this.enabled = true;
    this.onActivate();
  }
  deactivate(){
    if(this.enabled){
      for(let i = 0; i != this.transform.children.length; ++i){
        this.transform.children[i].owner.deactivate();
      }
      for(let i = 0; i != this.components.length; ++i){
        this.components[i].onDeactivate();
      }
    }
    this.enabled = false;
    this.onDeactivate();
  }

  onActivate(){

  }
  onDeactivate(){

  }

  run(){

    for(let i = 0; i != this.components.length; ++i){
      this.components[i].run();
    }
    for(let i = 0; i != this.transform.children.length; ++i){
      if(this.transform.children[i].owner.enabled){
        this.transform.children[i].owner.run();
      }
    }
  }

  updateTransform(renderer){
    this.transform.updateAll();
  }
  debugDraw(renderer){
    if (this.enabled){
      for(let i = 0; i != this.components.length; ++i){
        this.components[i].debugDraw(renderer);
      }
      for(let i = 0; i != this.transform.children.length; ++i){
        this.transform.children[i].owner.debugDraw(renderer);
      }
    }
    renderer.addDraw(new GameObjectDebugDraw(this));
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


class GameObjectDebugDraw{
  constructor(go){
    this.go = go;
  }

  getTransform(){
    return this.go.transform;
  }
  draw(renderer){
    push();
    this.go.transform.world.apply();
    stroke(255,0,0);
    line(-10,0, 10, 0);
    stroke(0,255,0);
    line(0,-10, 0, 10);
    if(this.go.name != ""){
      text(this.go.name, 0,0,200,200);
    }
    pop();
  }
}
