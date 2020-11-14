

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
