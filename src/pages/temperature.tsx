import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import * as store from '../stores/Temperature';
import { observer, Provider } from 'mobx-react';
import Temperature from '../components/Temperature';

@observer
class TempPage extends React.Component {
  t = new store.Temperature();

  componentDidMount() {
    (window as any).t = this.t;
  }

  render() {
    return (
      <>
        <DevTools />

        <p>
          As in the egghead course, you can open browser console and call things on <code>t</code>.
        </p>

        <Provider temperature={this.t}>
          <Temperature />
        </Provider>
      </>
    );
  }
}

export default TempPage;
