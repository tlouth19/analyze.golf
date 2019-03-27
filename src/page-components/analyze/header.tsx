import * as React from 'react';
import { navigate } from 'gatsby'
import { Pane, Button, Popover, Menu, IconButton } from 'evergreen-ui'

interface Props {}

class Header extends React.Component<Props> {
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
        justifyContent='space-between'>
        <Button iconBefore="arrow-left">
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