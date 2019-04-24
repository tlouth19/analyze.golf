import * as React from "react"
import { Pane, Text, Badge } from "evergreen-ui"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import Logo from "../images/app/logo.inline.svg"
import Twitter from "../images/social/twitter.inline.svg"

interface Props {}

const Header: React.FunctionComponent<Props> = () => (
	<Pane
		is="nav"
		elevation={1}
		display="flex"
		alignItems="center"
		height="3.5em"
		background="white"
		paddingX="1em"
		justifyContent="space-between">
		<Pane display="flex" alignItems="center">
			<Pane is={Link} to="/" display="flex" textDecoration="none" alignItems="center">
				<Pane is={Logo} height="1.5em" width="auto" />
			</Pane>
			<Badge color="neutral" marginLeft="1em">
				Beta
			</Badge>
		</Pane>
		<Pane display="flex" alignItems="center">
			<Text
				is={Link}
				size={300}
				to="/about"
				padding="1em"
				borderRadius="3px"
				css={css`
					:hover {
						background: #ededed;
					}
				`}
				textTransform="uppercase"
				textDecoration="none">
				About
			</Text>
			<Text
				is="a"
				marginLeft=".25em"
				display="flex"
				alignItems="center"
				justifyCenter="center"
				size={300}
				padding="1em"
				borderRadius="50%"
				cursor="pointer"
				css={css`
					:hover {
						background: #ededed;
					}
				`}
				textDecoration="none">
				<Twitter width="1em" height="1em" />
			</Text>
		</Pane>
	</Pane>
)

export default Header
