import { observable, action } from 'mobx';

export class CounterStore {
  @observable count: number = 0;

  @action
  increment() {
    this.count++;
  }

  @action
  decrement() {
    this.count--;
  }
}
