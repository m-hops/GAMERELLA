
class SceneUtil{
  static addImage(scene, img, x, y, z, w=null, h=null){
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
