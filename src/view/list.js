import React, { Component } from 'react'
import JSONPretty from 'react-json-pretty'
// import { data } from '../mock'
import 'react-json-pretty/themes/monikai.css';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

class List extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      this.setState({
        data: this.props.location.state.data
      })
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <JSONPretty theme={JSONPrettyMon} id="json-pretty" style={{fontSize: "1.1em", backgroundColor: '#eee'}} data={data}></JSONPretty>
      </div>
    )
  }
}

export default List