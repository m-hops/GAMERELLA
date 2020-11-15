
class Event{
  constructor(){
    this.begin = 0;
    this.end = 0;
  }
  onStart(timeline, timeOffset){

  }
  onRun(timeline){

  }
  onEnd(timeline, timeOffset){

  }
  onLerp(timeline, nextEvent, t){

  }
}
class TimelineComponent extends GameObjectComponent{
  static ID = 105;
  constructor(targetObject){
    super();
    this.events = [];
    this.time = 0;
    this.playing = false;
    this.lastEvent = -1;
    this.targetObject = targetObject;
  }
  getTargetObject(){
    if(this.targetObject != null) return targetObject;
    return this.owner;
  }
  is(flag){
    return flag === PositionTimeline.ID;
  }
  addEvent(event){
    this.events.push(event);
  }
  reset(){
    this.time = 0;
    this.lastEvent = -1;
  }
  start(){

    this.events.sort(function(a, b){return a.begin - b.begin});
    //console.log(this.events);
    this.playing = true;
  }
  updateTimeLine(nextTime){
    //run and check if last event has ended
    if(this.lastEvent >= 0){
      let endOffset = nextTime - this.events[this.lastEvent].end;
      if( endOffset >= 0){
        //event has ended
        this.events[this.lastEvent].onEnd(this, endOffset);
      } else {
        this.events[this.lastEvent].onRun(this);
        return;
      }
    }
    //advance in the timeline
    for(let i = this.lastEvent+1; i < this.events.length; ++i){
      let beginOffset = nextTime - this.events[i].begin;
      if( beginOffset >= 0){
        //event has started
        this.events[i].onStart(this, beginOffset);
        this.events[i].onRun(this);
      } else {
        //next event has not started yet
        if(this.lastEvent>=0){
          let diff = this.events[i].begin - this.events[this.lastEvent].end;
          let t = (this.time - this.events[this.lastEvent].end) / diff;
          this.events[this.lastEvent].onLerp(this, this.events[i], t);
        }
        return;
      }
      let endOffset = nextTime - this.events[i].end;
      if( endOffset >= 0){
        //event has ended
        this.events[i].onEnd(this, endOffset);
      }
      this.lastEvent = i;

    }
  }
  run(){
    if(this.playing){
      let nextTime = this.time + deltaTime;
      this.updateTimeLine(nextTime);
      this.time = nextTime;
    }

  }
}
class PositionKey extends  Event{
  constructor(time,x,y,z){
    super();
    this.begin = this.end = time;
    this.value = new p5.Vector(x,y,z);
  }

  onStart(timeline){
    //console.log("PositionKey.onStart " + this.value);
  }
  onEnd(timeline){
    //console.log("PositionKey.onEnd " + this.value);
  }
  onRun(timeline){
    //console.log("PositionKey.run " + this.value);
    timeline.getTargetObject().transform.local.position = this.value;
  }
  onLerp(timeline, nextEvent, t){
    //console.log("PositionKey.onLerp " + this.value + " to " + nextEvent.value + " with t =" + t);
    let value = p5.Vector.lerp(this.value, nextEvent.value, t);
    timeline.owner.transform.local.position = value;
  }
}
class PositionTimeline extends TimelineComponent{
  constructor(){
    super();
  }
  addKey(time, x, y, z){
    this.addEvent(new PositionKey(time, x,y,z));
  }
}

class RotationKey extends  Event{
  constructor(time,angle){
    super();
    this.begin = this.end = time;
    this.value = angle;
  }

  onStart(timeline){
    //console.log("PositionKey.onStart " + this.value);
  }
  onEnd(timeline){
    //console.log("PositionKey.onEnd " + this.value);
  }
  onRun(timeline){
    //console.log("PositionKey.run " + this.value);
    timeline.getTargetObject().transform.local.rotation = this.value;
  }
  onLerp(timeline, nextEvent, t){
    //console.log("PositionKey.onLerp " + this.value + " to " + nextEvent.value + " with t =" + t);
    let value = this.value * (1-t) + nextEvent.value * t;
    timeline.owner.transform.local.rotation = value;
  }
}
class RotationTimeline extends TimelineComponent{

  constructor(){
    super();
  }
  addKeyDegree(time, degree){
    this.addEvent(new RotationKey(time, degree/180*PI));
  }
}

class ScaleKey extends  Event{
  constructor(time,x,y,z){
    super();
    this.begin = this.end = time;
    this.value = new p5.Vector(x,y,z);
  }

  onStart(timeline){
    //console.log("PositionKey.onStart " + this.value);
  }
  onEnd(timeline){
    //console.log("PositionKey.onEnd " + this.value);
  }
  onRun(timeline){
    //console.log("PositionKey.run " + this.value);
    timeline.getTargetObject().transform.local.scale = this.value;
  }
  onLerp(timeline, nextEvent, t){
    //console.log("PositionKey.onLerp " + this.value + " to " + nextEvent.value + " with t =" + t);
    let value = p5.Vector.lerp(this.value, nextEvent.value, t);
    timeline.getTargetObject().transform.local.scale = value;
  }
}
class ScaleTimeline extends TimelineComponent{

  constructor(){
    super();
  }
  addKey(time, x, y, z){
    this.addEvent(new ScaleKey(time, x,y,z));
  }
}

class EventChangeScene extends  Event{
  constructor(time, scene){
    super();
    this.begin = this.end = time;
    this.scene = scene;
  }
  onStart(timeline){
    Engine.setScene(this.scene);
  }
}
class EventSFX extends  Event{
  constructor(time, sfx){
    super();
    this.begin = this.end = time;
    this.sfx = sfx;
    this.stopOnEnd = false;
  }
  onStart(timeline){
    this.sfx.play();
  }
  onEnd(timeline){
    if(this.stopOnEnd){
      this.sfx.stop();
    }
  }
}

class EventTimeline extends TimelineComponent{

  constructor(){
    super();
  }
}

class ActivateTimelinesOnClick  extends InteractiveComponent{

  constructor(targetObject=null){
    super();
    this.targetObject = targetObject;
  }
  processMouseClick(posLocal, posWorld, event){
    //console.log(event);
    let target = this.owner;
    if(this.targetObject != null) target = this.targetObject;
    let timelines = target.getAllComponentWithFlag(TimelineComponent.ID, true, true);
    for(let i = 0; i != timelines.length; ++i){
      timelines[i].start();
    }
    return false;
  }
}
