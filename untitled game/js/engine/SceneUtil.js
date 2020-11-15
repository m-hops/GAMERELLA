
class SceneUtil{
  static addImage(scene, name, img, x, y, z, w=null, h=null){
    let go = new GameObject(null,name);
    go.transform.local.setPosition(x,y,z);
    go.transform.local.setScale(1,1);
    go.transform.local.rotation = 0;
    let imgComp = new ImageRenderComponent(name, img, w,h);
    go.addComponent(imgComp);

    scene.addGameObject(go);
    return go;
  }

  static addText(scene, name, text, color, font, x, y, z, w, h){
    let go = new GameObject(null,name);
    go.transform.local.setPosition(x,y,z);
    go.transform.local.setScale(1,1);
    go.transform.local.rotation = 0;
    let comp = new TextRenderComponent(name, text, color, font, w,h);
    go.addComponent(comp);

    scene.addGameObject(go);
    return go;
  }
  static addSFX(scene, name, sfx, enabled){
    let go = new GameObject(null,name);
    let comp = new SFXComponent(name, sfx);
    go.addComponent(comp);
    go.enabled = enabled;
    scene.addGameObject(go);
    return go;
  }

  static addRectCollisionToObject(object, x, y, w, h){
    object.addComponent(new RectangleCollision(x, y, w, h));
  }
  static addButtonToObject(object, target, onClick){
    object.addComponent(new InteractiveComponent(target, onClick));
  }
}
