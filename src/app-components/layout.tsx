import * as React from 'react'
import { Pane } from 'evergreen-ui'
import Header from './header'

interface Props {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <Pane>
    <Header/>
    {children}
  </Pane>
)

export default Layout