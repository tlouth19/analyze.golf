import * as React from 'react';
import { Link } from 'gatsby';
import { Button, Pane, Text, Heading } from 'evergreen-ui'
import Layout from '../app-components/layout'
import Background from '../page-components/index/background'
import 'normalize.css'

export default () => (
  <Layout>
    <Pane 
      is='main'
      display='flex'
      alignItems='stretch' 
      justifyContent='center'
      width='100vw'
      height='calc(100vh - 4em)'>
      <Background>
        <Pane 
          height='calc(100vh - 4em)'
          display='flex'
          alignItems='center'
          justifyContent='center'>
          <Pane
            textAlign='center'>
            <Heading
              is='h1' 
              size={900}>
              Analyze your golf swing without downloading an app.
            </Heading>
            <Text
              size={600}>
              100% free. No ads. Just golf.
            </Text>
            <Pane>
              <Button 
                height={48}
                appearance='primary'
                intent='success'>
                Select My File
              </Button>
            </Pane>
          </Pane>
        </Pane>
      </Background>
    </Pane>
  </Layout>
);
