import * as React from 'react';
import { navigate } from 'gatsby'
import { observer, inject } from 'mobx-react';
import { Pane } from 'evergreen-ui'
import * as store from '../stores/FileStore';
import Layout from '../app-components/layout'
import Actions from '../page-components/analyze/actions'
import Player from '../page-components/analyze/player'
import Controls from '../page-components/analyze/controls'

interface Props {
  fileStore: store.FileStore
}

@inject('fileStore')
@observer
class Analyze extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.fileStore.file) {
      navigate('/')
    }
  }
  render() {
    return (
      <Layout hideHeader={true}>
        <Pane 
          is='section'
          display='flex'
          alignItems='stretch'
          flexDirection='column'
          height='100vh'
          width='100vw'
          background='black'>
          <Actions/>
          <Player/>
          <Controls/>
        </Pane>
      </Layout>
    )
  }
}

export default Analyze