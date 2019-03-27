import { FileStore } from "./FileStore";
import { PlayerStore } from './PlayerStore'

export const stores = {
 fileStore: new FileStore(),
 playerStore: new PlayerStore()
}