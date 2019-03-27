import * as React from 'react';
import { navigate } from 'gatsby'
import * as playerStore from '../../stores/PlayerStore'
import { Pane, IconButton, Strong, Button, Popover, Menu } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import Slider from 'react-rangeslider'

interface Props {
  playerStore: playerStore.PlayerStore
}
const speeds = [.10, .25, .50, .75, 1.0, 1.5, 2.0]

@inject('playerStore')
@observer
class Controls extends React.Component<Props> {
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
            <Menu.Group>
              {speeds.map(speed => 
                <Menu.Item 
                  key={speed}
                  onSelect={() => this.props.playerStore.setPlaybackSpeed(speed)}>
                  {speed}x
                </Menu.Item>
              )}
            </Menu.Group>
          </Menu>
          }>
          <Button>
            {this.props.playerStore.playbackSpeed}x
          </Button>
        </Popover>
      </Pane>
    )
  }
}

export default Controls
