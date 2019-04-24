import { observable, action } from "mobx"

export class DrawingStore {
	@observable fill: string = "transparent"
	@observable strokeWidth: number = 5
	@observable stroke: string = "Orange"
	@observable type: string = "line"
	@observable eraseCanvas?: any

	@action
	updateFill(fill: string) {
		this.fill = fill
	}

	@action
	updateStrokeWidth(strokeWidth: number) {
		this.strokeWidth = strokeWidth
	}

	@action
	updateStroke(stroke: string) {
		this.stroke = stroke
	}

	@action
	updateType(type: string) {
		this.type = type
	}

	@action
	setEraseCanvas(fn: any) {
		this.eraseCanvas = fn
	}
}
