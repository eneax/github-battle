import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


class App extends React.Component {
  render() {
    return (
      <div>Hello World! 😄</div>
    )
  }
}


ReactDOM.render(
  // element that we want to render
  <App />,
  // where to render the element
  document.getElementById('app'),
)
