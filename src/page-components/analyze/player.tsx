import * as React from 'react';
import { navigate } from 'gatsby'
import * as fileStore from '../../stores/FileStore';
import * as playerStore from '../../stores/PlayerStore'
import { Pane, Button, Popover, Menu, IconButton, Strong } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';

interface Props {
  fileStore: fileStore.FileStore
  playerStore: playerStore.PlayerStore
}
const speeds = [.1, .25, .5, .75, 1, 1.5, 2]

@inject('fileStore')
@inject('playerStore')
@observer
class Player extends React.Component<Props> {
  componentDidMount() {
    if (this.props.playerStore.videoElement && this.props.playerStore.sourceElement && this.props.fileStore.file) {
      const objectURL = URL.createObjectURL(this.props.fileStore.file);
      this.props.playerStore.sourceElement.src = objectURL
      this.props.playerStore.videoElement.load()
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
      <Pane background='black'>
      <Pane
        is='video'
        muted
        innerRef={(ref: HTMLVideoElement) => this.props.playerStore.setVideoElement(ref)}
        height='100vh'
        width='100vw'>
        <source 
          src=''
          ref={(ref: HTMLSourceElement) => this.props.playerStore.setSourceElement(ref)}/>
      </Pane>
      <Pane 
        position='fixed'
        bottom='0px'
        left='0px'
        right='0px'
        padding='1em'
        backgroundColor='rgba(110, 127, 143, 0.2)'
        display='flex'
        alignItems='center'>
        <IconButton
          onClick={() => this.props.playerStore.setPlaybackStatus(!this.props.playerStore.playing)} 
          icon={this.props.playerStore.playing ? 'pause' : 'play'}/>
        <Pane flex='auto'/>
        <Pane 
          display='flex'
          alignItems='center'>
            <IconButton
              icon='double-chevron-left'
              disabled={speeds.indexOf(this.props.playerStore.playbackSpeed) === 0}
              onClick={() => this.changePlaybackSpeed('slow')}/>
            <Strong
              width='3.5em'
              textAlign='center'>
              {this.props.playerStore.playbackSpeed}
            </Strong>
            <IconButton
              icon='double-chevron-right'
              disabled={speeds.indexOf(this.props.playerStore.playbackSpeed) === speeds.length - 1}
              onClick={() => this.changePlaybackSpeed('fast')}/>
        </Pane>
      </Pane>
      </Pane>
    )
  }
}

export default Player
