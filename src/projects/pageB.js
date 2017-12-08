import * as React from 'react'
import ReactDOM from 'react-dom'
import '../common/css/reset.css'

class HelloMessage extends React.Component {
  render() {
    return (
      <div>我是pageb</div>
    )
  }
  }
  
ReactDOM.render(
  <div><HelloMessage /></div>, document.getElementById('root')
  )
