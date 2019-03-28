import * as React from 'react';
import { Popover, Menu, IconButton } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import { DrawingStore } from '../../../stores/DrawingStore';

interface Props {
  drawingStore: DrawingStore
}

@inject('drawingStore')
@observer
class Drawing extends React.Component<Props> {
  erase() {
    if (this.props.drawingStore.eraseCanvas) {
      this.props.drawingStore.eraseCanvas()
    }
  }
  render() {
    return (
      <>
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
        <IconButton 
          marginX='auto' 
          icon="edit"
          marginBottom='1em'/>
      </Popover>
      <IconButton 
        marginX='auto' 
        icon="eraser"
        onClick={() => this.erase()}
        marginBottom='1em'/>
      </>
    )
  }
}

export default Drawing