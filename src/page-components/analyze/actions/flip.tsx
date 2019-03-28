import * as React from 'react'
import { IconButton } from 'evergreen-ui'
import { inject, observer } from 'mobx-react';
import { PlayerStore } from '../../../stores/PlayerStore';

interface Props {
  playerStore: PlayerStore
}

@inject('playerStore')
@observer
class Flip extends React.Component<Props> {
  render() {
    return (
      <IconButton
        icon='exchange' 
        marginBottom='1em'
        marginX='auto'
        onClick={() => this.props.playerStore.setFlip(!this.props.playerStore.flip)}/>
    )
  }
}

export default Flip