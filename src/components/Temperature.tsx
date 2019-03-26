import * as React from 'react';
import * as store from '../stores/Temperature';
import { inject, observer } from 'mobx-react';

interface Props {
  temperature?: store.Temperature;
}

const Temperature: React.SFC<Props> = ({ temperature }) => {
  return <div>{temperature!.formatted}</div>;
};

export default inject(
  // This is truly `any` as "temperature" in `<Provider temperature=...>` is not type-checked
  (stores: any) => ({ temperature: stores.temperature })
)(observer(Temperature));
