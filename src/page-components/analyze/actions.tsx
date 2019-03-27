import * as React from 'react';
import { navigate } from 'gatsby'
import * as fileStore from '../../stores/FileStore'
import { Pane, Button, Popover, Menu, IconButton } from 'evergreen-ui'
import { inject } from 'mobx-react';

interface Props {
  fileStore: fileStore.FileStore
}

@inject('fileStore')
class Actions extends React.Component<Props> {
  back() {
    this.props.fileStore.clear()
    navigate('/')
  }
  render() {
    return (
      <Pane 
        is='header'
        paddingX='1em'
        height='4em'
        display='flex'
        alignItems='center'
        zIndex={1}
        justifyContent='space-between'>
        <IconButton 
          icon="arrow-left"
          onClick={() => this.back()}/>
        <Popover
          content={
            <Menu>
            <Menu.Group>
              <Menu.Item>Share...</Menu.Item>
              <Menu.Item>Move...</Menu.Item>
              <Menu.Item>Rename...</Menu.Item>
            </Menu.Group>
          </Menu>
          }>
          <IconButton icon="edit"/>
        </Popover>
      </Pane>
    )
  }
}

export default Actions