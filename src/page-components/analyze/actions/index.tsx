import * as React from "react"
import { navigate } from "gatsby"
import Slider from "react-rangeslider"
import * as fileStore from "../../../stores/FileStore"
import { Pane, Button, Popover, Menu, IconButton } from "evergreen-ui"
import { inject, observer } from "mobx-react"
import { PlayerStore } from "../../../stores/PlayerStore"
import Drawing from "./drawing"
import Speed from "./speed"
import Play from "./play"
import Flip from "./flip"

interface Props {
	fileStore: fileStore.FileStore
	playerStore: PlayerStore
}

@inject("fileStore")
@inject("playerStore")
@observer
class Actions extends React.Component<Props> {
	back() {
		this.props.fileStore.clear()
		navigate("/")
	}
	skipBackward() {
		if (this.props.playerStore.videoElement) {
			this.props.playerStore.videoElement.currentTime = this.props.playerStore.videoElement.currentTime - 0.05
		}
	}
	skipForward() {
		if (this.props.playerStore.videoElement) {
			this.props.playerStore.videoElement.currentTime = this.props.playerStore.videoElement.currentTime + 0.05
		}
	}
	render() {
		return (
			<>
				<Pane
					position="fixed"
					top="0px"
					width="4em"
					textAlign="center"
					paddingY="1em"
					left="0px"
					bottom="0px"
					zIndex={1}>
					<Play />
					<IconButton icon="arrow-left" marginX="auto" marginBottom="1em" onClick={() => this.back()} />
					<Speed />
					<Drawing />
					<Flip />
				</Pane>
				<Pane
					position="fixed"
					height="4em"
					display="flex"
					alignItems="center"
					left="4em"
					right="0em"
					paddingRight="1em">
					<IconButton icon="step-backward" onClick={() => this.skipBackward()} marginRight="1em" />
					{this.props.playerStore.duration && (
						<Pane
							is={Slider}
							width="100%"
							min={0}
							step={0.05}
							max={this.props.playerStore.duration}
							value={this.props.playerStore.playbackTime}
							onChangeStart={() => this.props.playerStore.setPlaybackStatus(false)}
							onChange={(value: number) => this.props.playerStore.setPlaybackTime(value, true)}
							onChangeComplete={() => this.props.playerStore.setPlaybackStatus(true)}
						/>
					)}
					<IconButton icon="step-forward" onClick={() => this.skipForward()} marginLeft="1em" />
				</Pane>
			</>
		)
	}
}

export default Actions
