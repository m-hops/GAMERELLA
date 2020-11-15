
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

  addChild(go){
    this.transform.addChild(go.transform);
    return go;
  }
  removeChild(go){
    this.transform.removeChild(go.transform);
    return go;
  }

  // getFirstComponentByName(name, onlyEnabled=false){
  //   if(onlyEnabled && !this.enabled) return null;
  //   for(let i = 0; i != this.components.length; ++i){
  //     if( (!onlyEnabled || this.components[i].enabled)
  //         && this.components[i].name == name){
  //       return this.components[i];
  //     }
  //   }
  //   return null;
  // }

  getAllGameObjectByName(name, onlyEnabled=false, lookInChildren=true){
    let result = [];
    if(onlyEnabled && !this.enabled) return result;

    if(this.name == name){
      result.push(this);
    }

    if(lookInChildren){
      for(let i = 0; i != this.transform.children.length; ++i){
        let resultInChild = this.transform.children[i].owner.getAllGameObjectByName(name, onlyEnabled, lookInChildren);
        if(resultInChild.length > 0){
          result = result.concat(resultInChild);
        }
      }
    }
    return result;
  }

  getFirstComponentByName(name, onlyEnabled=false, lookInChildren=true){
    if(onlyEnabled && !this.enabled) return null;

    for(let i = 0; i != this.components.length; ++i){
      if( (!onlyEnabled || this.components[i].enabled)
          && this.components[i].name == name){
        return this.components[i];
      }
    }
    // check in children
    if(lookInChildren){
      for(let i = 0; i != this.transform.children.length; ++i){
        if(!onlyEnabled || this.transform.children[i].owner.enabled){
          result = this.transform.children[i].owner.getFirstComponentAndChildByName(name, onlyEnabled);
          if(result != null) return result;
        }
      }
    }

    return null;
  }
  getAllComponentByName(name, onlyActive=false, lookInChildren=true){
    if(!onlyActive || this.enabled){
      let result=[];
      for(let i = 0; i != this.components.length; ++i){
        if(this.components[i].name == name){
          result.push(this.components[i]);
        }
      }
      if(lookInChildren){
        for(let i = 0; i != this.transform.children.length; ++i){
          if(!onlyActive || this.transform.children[i].owner.enabled){
            let resultChildren = this.transform.children[i].owner.getAllComponentByName(name, onlyActive, lookInChildren);
            if(resultChildren.length > 0){
              result = result.concat(resultChildren);
            }
          }
        }
      }
      return result;
    }
    return [];
  }


  getFirstComponentWithFlag(flag){
    for(let i = 0; i != this.components.length; ++i){
      if(this.components[i].is(flag)){
        return this.components[i];
      }
    }
    return null;
  }

  // getAllComponentWithFlag(flag){
  //   let result=[];
  //   for(let i = 0; i != this.components.length; ++i){
  //     if(this.components[i].is(flag)){
  //       result.push(this.components[i]);
  //     }
  //   }
  //   return result;
  // }

  getAllComponentWithFlag(flag, onlyActive=false, lookInChildren=true){
    if(!onlyActive || this.enabled){
      let result=[];
      for(let i = 0; i != this.components.length; ++i){
        if(this.components[i].is(flag)){
          result.push(this.components[i]);
        }
      }
      if(lookInChildren){
        for(let i = 0; i != this.transform.children.length; ++i){
          if(!onlyActive || this.transform.children[i].owner.enabled){
            let resultChildren = this.transform.children[i].owner.getAllComponentWithFlag(flag, onlyActive, lookInChildren);
            if(resultChildren.length > 0){
              result = result.concat(resultChildren);
            }
          }
        }
      }
      return result;
    }
    return [];
  }
  // getAllComponentAndChildrenWithFlag(flag, onlyActive=false){
  //   if(!onlyActive || this.enabled){
  //     let result=this.getAllComponentWithFlag(flag);
  //     for(let i = 0; i != this.transform.children.length; ++i){
  //       if(!onlyActive || this.transform.children[i].owner.enabled){
  //         let resultChildren = this.transform.children[i].owner.getAllComponentAndChildrenWithFlag(flag, onlyActive);
  //         if(resultChildren.length > 0){
  //           result = result.concat(resultChildren);
  //         }
  //       }
  //     }
  //     return result;
  //   }
  //   return [];
  // }

  getTransform(){
    return this.transform;
  }

  setPositionVector(v){
    this.transform.local.position = v.copy();
  }
  setPosition(x,y,z=this.transform.local.position.z){
    this.transform.local.position.x = x;
    this.transform.local.position.y = y;
    this.transform.local.position.z = z;
  }
  getPosition(){
    return this.transform.world.position;
  }
  setScale(x,y){
    this.transform.local.scale.x = x;
    this.transform.local.scale.y = y;
  }
  vectorTo(other){
    return p5.Vector.sub(other.getTransform().world.position , this.getTransform().world.position);
  }
  distTo(other){
    return p5.Vector.sub(other.getTransform().world.position , this.getTransform().world.position).mag();
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
        //console.log("Debug Draw child");
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

  onDispose(){

    for(let i = 0; i != this.components.length; ++i){
      this.components[i].onDispose();
    }
    for(let i = 0; i != this.transform.children.length; ++i){
      this.transform.children[i].owner.onDispose();
    }
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
