import * as React from 'react'
import { Pane } from 'evergreen-ui'
import Header from './header'
import DevTools from 'mobx-react-devtools';
import 'normalize.css'

interface Props {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => (
    <Pane>
      <Header/>
      {children}
      <DevTools/>
    </Pane>
)

export default Layout