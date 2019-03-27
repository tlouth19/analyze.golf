import * as React from 'react';
import { Pane } from 'evergreen-ui'
import {fabric} from 'fabric'
console.log(fabric)

interface Props {}

class Draw extends React.Component<Props> {
  canvasRef?: HTMLCanvasElement
  canvas?: any
  isDown: boolean = false
  line: any
  circle: any
  startX: number = 0
  startY: number = 0
  componentDidMount() {
    if (this.canvasRef) {
      this.canvas = new fabric.Canvas(this.canvasRef, { selection: false })
      this.canvas.on('mouse:down', o => this.onMouseDown(o.e))
      this.canvas.on('mouse:move', o => this.onMouseMove(o.e))
      this.canvas.on('mouse:up', o => this.onMouseUp(o.e))
    }
  }
  linearDistance(point1: any, point2: any) {
      let xs = point2.x - point1.x;
      let ys = point2.y - point1.y;
      return Math.sqrt(xs * xs + ys * ys);
  }
  onMouseDown(e: React.SyntheticEvent) {
    this.isDown = true
    let pointer = this.canvas.getPointer(e)
    console.log(pointer)

    // const points = [ pointer.x, pointer.y, pointer.x, pointer.y ]
    // this.line = new fabric.Line(points, {
    //   strokeWidth: 5,
    //   fill: 'black',
    //   stroke: 'black',
    //   originX: 'center',
    //   originY: 'center'
    // })
    // this.canvas.add(this.line)
    this.startX = pointer.x 
    this.startY = pointer.y
    this.circle = new fabric.Circle({
      left: pointer.x, 
      top: pointer.y,
      originX: 'left', 
      originY: 'center',
      strokeWidth: 5,
      stroke: 'black',
      fill: 'transparent',
      selectable: false,
      evented: false,
      radius: 1
    })
    this.canvas.add(this.circle)
  }
  onMouseMove(e: React.SyntheticEvent) {
    if (!this.isDown) return
    else {
      let pointer = this.canvas.getPointer(e);
      // this.line.set({ x2: pointer.x, y2: pointer.y });
      // this.canvas.renderAll();
      this.circle.set({
          radius: this.linearDistance({x: this.startX, y: this.startY}, {x: pointer.x, y: pointer.y}) / 2,
          angle: Math.atan2(pointer.y - this.startY, pointer.x - this.startX) * 180 / Math.PI
      });
      this.circle.setCoords();
      this.canvas.renderAll();
    }
  }
  onMouseUp(e: React.SyntheticEvent) {
    this.isDown = false
  }
  render() {
    return (
      <>
      <canvas 
        ref={(ref: HTMLCanvasElement) => this.canvasRef = ref}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}/>
        <button onClick={() => this.canvas.remove(...this.canvas.getObjects())}>Erase</button>
      </>
    )
  }
}

export default Draw

// var canvas = new fabric.Canvas('c', { selection: false });

// var line, isDown;

// canvas.on('mouse:down', function(o){
//   isDown = true;
//   var pointer = canvas.getPointer(o.e);
//   var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
//   if(document.getElementById('linetype').value == "dashed") {
//      line = new fabric.Line(points, {
//       strokeWidth: 5,
//       strokeDashArray: [15, 5],
//       fill: 'gray',
//       stroke: 'gray',
//       originX: 'center',
//       originY: 'center'
//     });
//   }
//   else {
//     line = new fabric.Line(points, {
//       strokeWidth: 5,
//       fill: 'black',
//       stroke: 'black',
//       originX: 'center',
//       originY: 'center'
//     });
//   }
  
//   canvas.add(line);
// });

// canvas.on('mouse:move', function(o){
//   if (!isDown) return;
//   var pointer = canvas.getPointer(o.e);
//   line.set({ x2: pointer.x, y2: pointer.y });
//   canvas.renderAll();
// });

// canvas.on('mouse:up', function(o){
//   isDown = false;
// });