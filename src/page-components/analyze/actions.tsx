import * as React from 'react';
import { navigate } from 'gatsby'
import * as fileStore from '../../stores/FileStore'
import { Pane, Button, Popover, Menu, IconButton } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import { DrawingStore } from '../../stores/DrawingStore';

interface Props {
  fileStore: fileStore.FileStore
  drawingStore: DrawingStore
}

@inject('fileStore')
@inject('drawingStore')
@observer
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
            <Menu.Group title='Drawing Tool'>
              <Menu.Item 
                icon='minus'
                intent={this.props.drawingStore.type === 'line' ? 'success' : ''}
                onSelect={() => this.props.drawingStore.updateType('line')}>
                Line
              </Menu.Item>
              <Menu.Item 
                icon='circle'
                intent={this.props.drawingStore.type === 'circle' ? 'success' : 'none'}
                onSelect={() => this.props.drawingStore.updateType('circle')}>
                Circle
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group title='Drawing Color'>
              {[
                { label: "White", key: "none" },
                { label: "Green", key: "success" },
                { label: "Orange", key: "warning" },
                { label: "Red", key: "danger" }
              ].map(obj => 
                <Menu.Item 
                  key={obj.key}
                  icon='symbol-square'
                  intent={this.props.drawingStore.stroke === obj.label ? obj.key : 'none'}
                  onSelect={() => this.props.drawingStore.updateStroke(obj.label)}>
                  {obj.label}
                </Menu.Item>
              )}
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