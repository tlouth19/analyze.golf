import * as React from 'react';
import { observer } from 'mobx-react';
import * as store from '../stores/CounterStore';

@observer
class Counter extends React.Component<{ store: store.CounterStore }> {
  render() {
    return (
      <div>
        Counter: {this.props.store.count} <br />
        <button onClick={this.increment}> + </button>
        <button onClick={this.decrement}> - </button>
      </div>
    );
  }

  increment = () => {
    this.props.store.increment();
  };

  decrement = () => {
    this.props.store.decrement();
  };
}

export default Counter;
