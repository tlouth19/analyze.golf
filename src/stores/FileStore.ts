import { observable, action } from 'mobx';

export class FileStore {
  @observable file?: File = undefined;

  @action
  set(file: File) {
    console.log(file)
    this.file = file
  }

  @action
  clear() {
    this.file = undefined
  }
}
