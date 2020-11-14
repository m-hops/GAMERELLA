

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
