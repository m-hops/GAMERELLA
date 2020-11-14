
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
