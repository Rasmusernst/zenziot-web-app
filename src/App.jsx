import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
    return (
     <div>
        <h2>Hello World! {this.props.name}</h2>
      </div>
      );
  }
}
