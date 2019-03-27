import * as React from 'react';
import { navigate } from 'gatsby'
import * as fileStore from '../../stores/FileStore'
import { Pane, Button, Popover, Menu, IconButton } from 'evergreen-ui'
import { inject } from 'mobx-react';

interface Props {
  fileStore: fileStore.FileStore
}

@inject('fileStore')
class Header extends React.Component<Props> {
  back() {
    this.props.fileStore.clear()
    navigate('/')
  }
  render() {
    return (
      <Pane 
        is='header'
        padding='1em'
        backgroundColor='rgba(110, 127, 143, 0.8)'
        display='flex'
        position='fixed'
        top='0px'
        left='0px'
        right='0px'
        alignItems='center'
        zIndex={1}
        justifyContent='space-between'>
        <Button 
          iconBefore="arrow-left"
          onClick={() => this.back()}>
          Back
        </Button>
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

export default Header