import * as React from 'react';
import Counter from '../components/Counter';
import DevTools from 'mobx-react-devtools';
import { CounterStore } from '../stores/CounterStore';

export default () => (
  <>
    <DevTools />
    <Counter store={new CounterStore()} />
  </>
);
