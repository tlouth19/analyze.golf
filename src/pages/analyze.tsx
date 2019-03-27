import * as React from 'react';
import { navigate } from 'gatsby'
import { observer, inject } from 'mobx-react';
import * as store from '../stores/FileStore';
import Layout from '../app-components/layout'
import Header from '../page-components/analyze/header'
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
    console.log(this.props)
    return (
      <Layout hideHeader={true}>
        <Header/>
        <Player/>
      </Layout>
    )
  }
}

export default Analyze