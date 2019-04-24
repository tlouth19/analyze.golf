import { FileStore } from "./FileStore"
import { PlayerStore } from "./PlayerStore"
import { DrawingStore } from "./DrawingStore"

export const stores = {
	fileStore: new FileStore(),
	playerStore: new PlayerStore(),
	drawingStore: new DrawingStore()
}
