import * as React from 'react';
import { navigate } from 'gatsby'
import { observer, inject } from 'mobx-react';
import { Pane } from 'evergreen-ui'
import * as store from '../stores/FileStore';
import Layout from '../app-components/layout'
import Actions from '../page-components/analyze/actions'
import Player from '../page-components/analyze/player'

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
          width='100vw'
          height='100vh'
          background='black'>
          <Actions/>
          <Player/>
        </Pane>
      </Layout>
    )
  }
}

export default Analyze