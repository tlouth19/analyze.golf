import * as React from "react"
import { Pane, Text, Badge } from "evergreen-ui"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Logo from "../images/logo/logo.inline.svg"
import Twitter from "../images/social/twitter.inline.svg"

const HoverButton = styled(Link)`
	:hover {
		background: #ededed;
	}
`

const HoverAnchor = styled.a`
	:hover {
		background: #ededed;
	}
`

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
				is={HoverButton}
				size={300}
				to="/about"
				padding="1em"
				borderRadius="3px"
				textTransform="uppercase"
				textDecoration="none"
				title='View about page'>
				About
			</Text>
			<Text
				is={HoverAnchor}
				href='https://twitter.com/AnalyzeGolf'
				target='_blank'
				rel='noopener noreferrer'
				marginLeft=".25em"
				display="flex"
				alignItems="center"
				justifyContent="center"
				size={300}
				padding="1em"
				borderRadius="50%"
				cursor="pointer"
				textDecoration="none">
				<Twitter width="1em" height="1em" alt='Twitter' title='View Twitter page'/>
			</Text>
		</Pane>
	</Pane>
)

export default Header
