import * as React from 'react';
import { Popover, Menu, IconButton } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import { PlayerStore } from '../../../stores/PlayerStore';

interface Props {
  playerStore: PlayerStore
}

const speeds = [.10, .25, .50, .75, 1.0, 1.5, 2.0]

@inject('playerStore')
@observer
class PlaybackSpeed extends React.Component<Props> {
  changePlaybackSpeed(type: string) {
    const current_speed = this.props.playerStore.playbackSpeed
    let new_speed = null
    if (type === 'slow') new_speed = speeds[speeds.indexOf(current_speed) - 1]
    else new_speed = speeds[speeds.indexOf(current_speed) + 1]
    this.props.playerStore.setPlaybackSpeed(new_speed)
  }
  render() {
    return (
      <Popover
        content={
          <Menu>
          <Menu.Group title='Playback Speed'>
            {speeds.map(speed => 
              <Menu.Item 
                key={speed}
                intent={this.props.playerStore.playbackSpeed === speed ? 'success' : 'none'}
                onSelect={() => this.props.playerStore.setPlaybackSpeed(speed)}>
                {speed.toFixed(1)}x
              </Menu.Item>
            )}
          </Menu.Group>
        </Menu>
        }>
        <IconButton 
          icon='pulse' 
          marginX='auto'
          marginBottom='1em'/>
      </Popover>
    )
  }
}

export default PlaybackSpeed