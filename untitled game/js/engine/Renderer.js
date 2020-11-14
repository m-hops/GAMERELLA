
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
