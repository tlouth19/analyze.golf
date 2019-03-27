import * as React from 'react';
import { navigate } from 'gatsby'
import * as fileStore from '../../stores/FileStore';
import * as playerStore from '../../stores/PlayerStore'
import { Pane, Button, Popover, Menu, IconButton, Strong } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import Slider from 'react-rangeslider'

interface Props {
  fileStore: fileStore.FileStore
  playerStore: playerStore.PlayerStore
}
const speeds = [.10, .25, .50, .75, 1.0, 1.5, 2.0]
{/* <Slider
  min={Number}
  max={Number}
  step={Number}
  value={Number}
  orientation={String}
  reverse={Boolean}
  tooltip={Boolean}
  labels={Object}
  handleLabel={String}
  format={Function}
  onChangeStart={Function}
  onChange={Function}
  onChangeComplete={Function}
/> */}
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
  componentWillUnmount() {
		if (this.props.fileStore.file) {
			const objectURL = URL.createObjectURL(this.props.fileStore.file);
			URL.revokeObjectURL(objectURL);
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
    if (this.props.playerStore.videoElement) {
     console.log(this.props.playerStore.videoElement.playbackRate)
    }
    return (
      <Pane background='black'>
      <Pane
        is='video'
        muted
        innerRef={(ref: HTMLVideoElement) => this.props.playerStore.setVideoElement(ref)}
        // onTimeUpdate={(e: React.SyntheticEvent) => this.props.playerStore.setPlaybackTime(parseFloat(e.target.currentTime), false)}
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
          appearance="minimal"
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
        <Pane 
          display='flex'
          alignItems='center'>
            <IconButton
              appearance="minimal"
              icon='double-chevron-left'
              disabled={speeds.indexOf(this.props.playerStore.playbackSpeed) === 0}
              onClick={() => this.changePlaybackSpeed('slow')}/>
            <Strong
              width='3.5em'
              textAlign='center'>
              {this.props.playerStore.playbackSpeed}
            </Strong>
            <IconButton
              appearance="minimal"
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
