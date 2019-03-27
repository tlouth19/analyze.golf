import * as React from 'react';
import { Pane } from 'evergreen-ui'
import {fabric} from 'fabric'
import { observer, inject } from 'mobx-react';
import { DrawingStore } from '../../stores/DrawingStore';

interface Props {
  drawingStore: DrawingStore
}

@inject('drawingStore')
@observer
class Draw extends React.Component<Props> {
  canvasRef?: HTMLCanvasElement
  wrapRef?: HTMLElement
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
      if (this.wrapRef) {
        const { width, height } = this.wrapRef.getBoundingClientRect()
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
      }
    }
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('orientation', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('orientation', this.onWindowResize)
  }
  onWindowResize() {
    if (this.wrapRef) {
      const { width, height } = this.wrapRef.getBoundingClientRect()
      this.canvas.setHeight(height);
      this.canvas.setWidth(width);
      this.canvas.renderAll();
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
    if (this.props.drawingStore.type === 'line') {
      const points = [ pointer.x, pointer.y, pointer.x, pointer.y ]
      this.line = new fabric.Line(points, {
        strokeWidth: this.props.drawingStore.strokeWidth,
        fill: this.props.drawingStore.fill,
        stroke: this.props.drawingStore.stroke,
        originX: 'center',
        originY: 'center'
      })
      this.canvas.add(this.line)
    }
    else {
      this.startX = pointer.x 
      this.startY = pointer.y
      this.circle = new fabric.Circle({
        left: pointer.x, 
        top: pointer.y,
        originX: 'left', 
        originY: 'center',
        strokeWidth: this.props.drawingStore.strokeWidth,
        stroke: this.props.drawingStore.stroke,
        fill: this.props.drawingStore.fill,
        selectable: false,
        evented: false,
        radius: 1
      })
      this.canvas.add(this.circle)
    }
  }
  onMouseMove(e: React.SyntheticEvent) {
    if (!this.isDown) return
    else {
      let pointer = this.canvas.getPointer(e);
      if (this.props.drawingStore.type === 'line') {
        this.line.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.renderAll();
      }
      else {
        this.circle.set({
          radius: this.linearDistance({x: this.startX, y: this.startY}, {x: pointer.x, y: pointer.y}) / 2,
          angle: Math.atan2(pointer.y - this.startY, pointer.x - this.startX) * 180 / Math.PI
        });
        this.circle.setCoords();
        this.canvas.renderAll();
      }
    }
  }
  onMouseUp(e: React.SyntheticEvent) {
    this.isDown = false
  }
  render() {
    console.log(this.props.drawingStore.type)
    return (
      <Pane 
        innerRef={(ref: HTMLElement) => this.wrapRef = ref}
        position='absolute'
        top='0px'
        right='0px'
        bottom='0px'
        left='0px'>
        <Pane 
          is='canvas' 
          zIndex={2}
          innerRef={(ref: HTMLCanvasElement) => this.canvasRef = ref}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}/>
      </Pane>
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