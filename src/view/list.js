import React, { Component } from 'react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

class List extends Component {
  render() {
    return (
      <div>
        <JSONPretty theme={JSONPrettyMon} id="json-pretty" style={{fontSize: "1.1em", backgroundColor: '#eee'}} data={this.props.location && this.props.location.state}></JSONPretty>
      </div>
    )
  }
}

export default List