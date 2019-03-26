import * as React from 'react'
import { Pane, Text } from 'evergreen-ui'

interface Props {}

const Header: React.FunctionComponent<Props> = () => (
  <Pane 
    is='nav'
    elevation={3}
    display='flex'
    alignItems='center'
    height='4em'
    paddingX='2em'
    justifyContent='space-betwee'>
    <Pane><Text>Swingz</Text></Pane>
  </Pane>
)

export default Header