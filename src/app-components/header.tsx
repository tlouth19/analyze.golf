import * as React from 'react'
import { Pane, Text, Badge } from 'evergreen-ui'
import { Link } from 'gatsby';
import Logo from '../images/app/logo.svg'

interface Props {}

const Header: React.FunctionComponent<Props> = () => (
  <Pane 
    is='nav'
    elevation={1}
    display='flex'
    alignItems='center'
    height='3.5em'
    background='white'
    paddingX='1em'
    justifyContent='space-between'>
    <Pane 
      display='flex'
      alignItems='center'>
      <Pane
        is={Link} 
        to='/'
        display='flex'
        textDecoration='none'
        alignItems='center'>
        <Pane 
          is={Logo}
          height='1.5em'
          width='auto'/>
      </Pane>
      <Badge
          color='neutral'
          marginLeft='1em'>
          Beta
        </Badge>
    </Pane>
    <Text 
      is={Link}
      size={300}
      to='/about'
      textTransform='uppercase'
      textDecoration='none'>
      About  
    </Text>
  </Pane>
)

export default Header