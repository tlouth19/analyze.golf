import * as React from 'react'
import { Pane } from 'evergreen-ui'
import Header from './header'
import 'normalize.css'

interface Props {
  children: React.ReactNode
  hideHeader?: boolean
}

const Layout: React.FunctionComponent<Props> = ({ children, hideHeader }) => (
    <Pane>
      {!hideHeader && <Header/>}
      {children}
    </Pane>
)

export default Layout