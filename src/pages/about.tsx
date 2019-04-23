import * as React from 'react';
import { Pane, Heading, Text } from 'evergreen-ui'
import Layout from '../app-components/layout'

export default () => (
  <Layout>
    <Pane 
      is='section'
      paddingX='3em'
      maxWidth='64em'
      margin='auto'>
      <Heading 
        size={800}
        marginBottom='.5em'
        marginTop='3em'>
        A free tool to help golfers
      </Heading>
      <Text size={500}>
        Analyze.golf was built to give golfers a free browser based swing analysis tool. 
      </Text>
    </Pane>  
  </Layout>
)