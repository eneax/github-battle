import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import Popular from './components/Popular'


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    )
  }
}


ReactDOM.render(
  // element that we want to render
  <App />,
  // where to render the element
  document.getElementById('app'),
)
