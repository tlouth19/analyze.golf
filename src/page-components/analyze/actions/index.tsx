import * as React from 'react';
import { navigate } from 'gatsby'
import Slider from 'react-rangeslider'
import * as fileStore from '../../../stores/FileStore'
import { Pane, Button, Popover, Menu, IconButton } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import { PlayerStore } from '../../../stores/PlayerStore';
import Drawing from './drawing'
import Speed from './speed'

interface Props {
  fileStore: fileStore.FileStore
  playerStore: PlayerStore
}

@inject('fileStore')
@inject('playerStore')
@observer
class Actions extends React.Component<Props> {
  back() {
    this.props.fileStore.clear()
    navigate('/')
  }
  render() {
    return (
      <>
      <Pane 
        position='fixed'
        top='0px'
        width='4em'
        textAlign='center'
        paddingY='1em'
        left='0px'
        bottom='0px'
        zIndex={1}>
        <IconButton
          icon={this.props.playerStore.playing ? 'pause' : 'play'} 
          marginBottom='1em'
          marginX='auto'
          onClick={() => this.props.playerStore.setPlaybackStatus(!this.props.playerStore.playing)}/>
        <IconButton 
          icon="arrow-left"
          marginX='auto'
          marginBottom='1em'
          onClick={() => this.back()}/>
        <Speed/>
        <Drawing/>
      </Pane>
      <Pane 
        position='fixed'
        height='4em'
        display='flex'
        alignItems='center'
        left='4em'
        right='0em'
        paddingRight='1em'>
        <IconButton 
          icon='step-backward' 
          marginRight='1em'/>
        {this.props.playerStore.duration &&
          <Pane
            is={Slider}
            width='100%'
            min={0}
            max={this.props.playerStore.duration}
            value={this.props.playerStore.playbackTime}
            onChangeStart={() => this.props.playerStore.setPlaybackStatus(false)}
            onChange={(value: number) => this.props.playerStore.setPlaybackTime(value, true)}
            onChangeComplete={() => this.props.playerStore.setPlaybackStatus(true)}/>
        }
        <IconButton 
          icon='step-forward' 
          marginLeft='1em'/>
        </Pane>
      </>
    )
  }
}

export default Actions