import * as React from 'react'
import { Pane } from 'evergreen-ui'
import Header from './header'
import { Helmet } from 'react-helmet'
import social from './social.jpg'
import 'normalize.css'
import '../css/range.css'

type Props = {
  children: React.ReactNode
  hideHeader?: boolean
  title: string
  description: string
}

const Layout: React.FunctionComponent<Props> = ({ children, hideHeader, title, description }) => (
    <Pane>
      <Helmet
        title={title}
        htmlAttributes={{ lang: "en" }}
        meta={[
          { name: "description", content: description },
          { name: "keywords", content: 'Swing Analysis, Golf Swing, Golf Swing Analysis, Free Golf Swing Analysis' },
          { name: "og:url", content: social },
          { name: "og:type", content: "website" },
          { name: "og:title", content: "Analyze.Golf | Free Browser-Based Golf Swing Analysis Tool" },
          { name: "og:description", content: description },
          { name: "og:image", content: social },
          { name: "og:image:secure_url", content: social },
          { name: "og:image:type", content: "image/jpeg" },
          { name: "og:site", content: "@analyze.golf" },
          { name: "og:creator", content: "@analyze.golf" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:site", content: "@analyze.golf" },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
          { name: "twitter:image", content: social },
        ]}
      />
      {!hideHeader && <Header/>}
      {children}
    </Pane>
)

Layout.defaultProps = {
  title: 'Analyze.Golf | Free Swing Analysis Tool | No App Download',
  description: 'Analyze.Golf is a free browser-based golf swing analysis tool. No app download or file uploading necessary.'
}

export default Layout