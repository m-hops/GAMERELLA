
class Screen{
  static refWidth = 1920.0;
  static refHeight = 1080.0;
  static aspectRatio = 1920.0 / 1080.0;
  static aspectRatioFixed = true;
  static canvasWidth = 0;
  static canvasHeight = 0;
  constructor(){

  }
  static RefToScreen(vector){
    return createVector(
      (vector.x / Screen.refWidth) * Screen.canvasWidth,
      (vector.y / Screen.refHeight) * Screen.canvasHeight,
      vector.z);
  }
  static ComputeCanvasSize(){

    if(Screen.aspectRatioFixed){
      var scaleX = windowWidth / Screen.refWidth;
      var scaleY = windowHeight / Screen.refHeight;
      if(scaleY < scaleX){
        Screen.canvasWidth = Screen.refWidth * scaleY;
        Screen.canvasHeight = windowHeight;
      } else {
        Screen.canvasWidth = windowWidth;
        Screen.canvasHeight = Screen.refHeight * scaleX;
      }
    } else {
      Screen.canvasWidth = windowWidth;
      Screen.canvasHeight = windowHeight;
    }
    //console.log("ComputeCanvasSize ("
    //  + windowWidth + "," + windowHeight +
    //  ") -> (" + Screen.canvasWidth + "," + Screen.canvasHeight + ")");
  }
  static ResizeCanvas(){
    this.ComputeCanvasSize();
    resizeCanvas(Screen.canvasWidth, Screen.canvasHeight);
  }
  static CreateCanvas(){
    this.ComputeCanvasSize();
    createCanvas(Screen.canvasWidth, Screen.canvasHeight);
  }
  static RefToScreenAABB(aabb){
    return aabb.multed(Screen.canvasWidth / Screen.refWidth);
  }
  static applyTransform(){
    var s = Screen.GetWorldToScreenScale();
    scale(s.x,s.y);
  }
  static GetWorldToScreenScale(){
    if(Screen.aspectRatioFixed){
      var scaleX = Screen.canvasWidth / Screen.refWidth;
      var scaleY = Screen.canvasHeight / Screen.refHeight;
      if(scaleY < scaleX){
        return createVector(scaleY,scaleY);
      } else {
        return createVector(scaleX,scaleX);
      }
    } else {
      return createVector(Screen.canvasWidth / Screen.refWidth, Screen.canvasHeight / Screen.refHeight);
    }
  }
  //static FixAspectRatio(ratio){
  //  Screen.aspectRatio = ratio;
  //  Screen.aspectRatioFixed = true;
  //}

  static getMouseVector(){

    var s = Screen.GetWorldToScreenScale();
    return new p5.Vector(mouseX / s.x, mouseY / s.y, 0);
  }
}
