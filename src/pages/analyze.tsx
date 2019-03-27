import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as store from '../stores/FileStore';
import Layout from '../app-components/layout'

interface Props {
  store: store.FileStore
}

@inject(stores => console.log(stores))
@observer
class Analyze extends React.Component<Props> {
  render() {
    console.log(this.props)
    return (
      <Layout>
      yo
    </Layout>
    )
  }
}
export default Analyze