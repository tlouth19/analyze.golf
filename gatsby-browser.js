const React = require('react')
const stores = require('./src/stores/index').stores
const Provider = require('mobx-react').Provider

export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = (
    <Provider {...stores}>
      <React.Fragment>
        {element}
      </React.Fragment>
    </Provider>
  )
  return ConnectedRootElement
}