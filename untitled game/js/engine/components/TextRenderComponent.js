

class TextRenderComponent extends RenderComponent{

  constructor(name, text, color, font, w=1000, h=1000){
    super(name);
    this.text = text;
    this.w = w;
    this.h = h;
    this.color = color;
    this.font = font;
    this.size = 12;
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
    textSize(this.size);
    text(this.text, 0, 0, this.w, this.h)
    pop();
  }
}
