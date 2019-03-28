import * as React from 'react';
import { navigate } from 'gatsby'
import Slider from 'react-rangeslider'
import * as fileStore from '../../stores/FileStore'
import { Pane, Button, Popover, Menu, IconButton } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import { DrawingStore } from '../../stores/DrawingStore';
import { PlayerStore } from '../../stores/PlayerStore';

interface Props {
  fileStore: fileStore.FileStore
  drawingStore: DrawingStore
  playerStore: PlayerStore
}

const speeds = [.10, .25, .50, .75, 1.0, 1.5, 2.0]

@inject('fileStore')
@inject('drawingStore')
@inject('playerStore')
@observer
class Actions extends React.Component<Props> {
  back() {
    this.props.fileStore.clear()
    navigate('/')
  }
  erase() {
    if (this.props.drawingStore.eraseCanvas) {
      this.props.drawingStore.eraseCanvas()
    }
  }
  changePlaybackSpeed(type: string) {
    const current_speed = this.props.playerStore.playbackSpeed
    let new_speed = null
    if (type === 'slow') new_speed = speeds[speeds.indexOf(current_speed) - 1]
    else new_speed = speeds[speeds.indexOf(current_speed) + 1]
    this.props.playerStore.setPlaybackSpeed(new_speed)
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
        <Pane flex='auto'>
          <Pane 
          height='5em'
          paddingX='1em'
          display='flex'
          alignItems='center'>
          <IconButton
            onClick={() => this.props.playerStore.setPlaybackStatus(!this.props.playerStore.playing)} 
            icon={this.props.playerStore.playing ? 'pause' : 'play'}/>
          <Pane 
            flex='auto'
            display='flex'
            alignItems='center'
            paddingX='2em'>
            <Pane
              is={Slider}
              width='100%'
              min={0}
              // max={this.props.playerStore.videoElement ? this.props.playerStore.videoElement.duration : 0}
              max={160}
              value={this.props.playerStore.playbackTime}
              onChangeStart={() => this.props.playerStore.setPlaybackStatus(false)}
              onChange={(value: number) => this.props.playerStore.setPlaybackTime(value, true)}
              onChangeComplete={() => this.props.playerStore.setPlaybackStatus(true)}/>
          </Pane>
          <Popover
            content={
              <Menu>
              <Menu.Group title='Playback Speed'>
                {speeds.map(speed => 
                  <Menu.Item 
                    key={speed}
                    onSelect={() => this.props.playerStore.setPlaybackSpeed(speed)}>
                    {speed.toFixed(1)}x
                  </Menu.Item>
                )}
              </Menu.Group>
            </Menu>
            }>
            <Button>
              {this.props.playerStore.playbackSpeed.toFixed(1)}x
            </Button>
          </Popover>
        </Pane>
        </Pane>
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
            <Menu.Divider />
            <Menu.Group title='Drawing Actions'>
              <Menu.Item 
                icon='eraser'
                onSelect={() => this.erase()}>
                Erase All
              </Menu.Item>
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