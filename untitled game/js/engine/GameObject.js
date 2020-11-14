
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

  setPosition(x,y){
    this.transform.local.position.x = x;
    this.transform.local.position.y = y;
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
