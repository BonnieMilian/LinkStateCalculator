import React, { Component } from 'react';
import InputNodes from './InputNodes';
import OutputSteps from './OutputSteps';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        N: [],
        LinkStateSteps: [],
        Who: ""
    }
  }

  updateSolution = (n, steps, who) => {
    this.setState({
      N: n, LinkStateSteps: steps, Who: who
    });
  }

  render() {
    return (
      <div>
        <h1>Link-State Algorithm Calculator</h1>
        <p />
        <InputNodes updateSolution={this.updateSolution} />
        <p />
        { (this.state.N.length > 0) ? (<OutputSteps N={this.state.N} LinkStateSteps={this.state.LinkStateSteps} Who={this.state.Who} />) : ""}
      </div>
    );
  }
}