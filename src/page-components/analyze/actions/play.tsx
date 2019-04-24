import * as React from "react"
import { IconButton } from "evergreen-ui"
import { inject, observer } from "mobx-react"
import { PlayerStore } from "../../../stores/PlayerStore"
interface Props {
	playerStore: PlayerStore
}

@inject("playerStore")
@observer
class Play extends React.Component<Props> {
	render() {
		return (
			<IconButton
				icon={this.props.playerStore.playing ? "pause" : "play"}
				marginBottom="1em"
				marginX="auto"
				onClick={() => this.props.playerStore.setPlaybackStatus(!this.props.playerStore.playing)}
			/>
		)
	}
}

export default Play
