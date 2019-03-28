import * as React from 'react';
import { Pane, Text, Heading } from 'evergreen-ui'
import Media from 'react-media'
import Layout from '../app-components/layout'
import Screenshot from '../page-components/index/screenshot'
import Logo from '../images/app/logo.svg'
import SelectFile from '../page-components/index/select_file'

export default () => (
  <Layout>
    <Media query={{ minWidth: 599, minHeight: 600 }}>
      {matches =>
        <Pane 
          is='section'
          display='flex'
          alignItems='stretch' 
          justifyContent='center'
          width='100vw'
          minHeight='300px'
          height='calc(100vh - 3.5em)'>
          <Pane 
            display='flex'
            alignItems='center'
            width='100%'
            padding='2em'
            maxWidth='64em'>
            <Pane 
              flex='1'
              textAlign={matches ? 'left' : 'center'}>
              <Pane 
                is={Logo}
                height='1.5em'
                width='auto'/>
              <Heading
                marginTop='.25em'
                is='h1' 
                size={900}>
                Free Golf Swing Analyzer
              </Heading>
              <Text
                display='block'
                marginTop='.5em'
                size={600}>
                No ads. No video upload. No app download.
              </Text>
              <SelectFile/>
            </Pane>
            {matches && 
              <Pane 
                flex='1'>
                <Pane is={Screenshot}/>
              </Pane>
            }
          </Pane>
        </Pane>
      }
    </Media>
  </Layout>
)