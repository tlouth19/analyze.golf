import * as React from 'react';
import * as fileStore from '../../stores/FileStore';
import * as playerStore from '../../stores/PlayerStore'
import { Pane } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import Draw from './draw'

interface Props {
  fileStore: fileStore.FileStore
  playerStore: playerStore.PlayerStore
}

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
    this.props.fileStore.clear()
    this.props.playerStore.clear()
  }
  render() {
    return (
      <Pane 
        position='fixed'
        top='4em'
        left='4em'
        bottom='2em'
        right='0em'>
          <Draw/>
          <Pane
            is='video'
            muted={true}
            maxHeight='100%'
            maxWidth='100%'
            transform={`scaleX(${this.props.playerStore.flip ? -1 : 1})`}
            height='100%'
            width='100%'
            innerRef={(ref: HTMLVideoElement) => this.props.playerStore.setVideoElement(ref)}
            onTimeUpdate={(e: React.SyntheticEvent) => this.props.playerStore.setPlaybackTime(parseFloat(e.target.currentTime), false)}>
            <source 
              src=''
              ref={(ref: HTMLSourceElement) => this.props.playerStore.setSourceElement(ref)}/>
          </Pane>
      </Pane>
    )
  }
}

export default Player
