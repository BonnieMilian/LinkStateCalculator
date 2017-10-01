import React, { Component } from 'react';

const divStyle = {
    tbCn: {
        width: "wrap", textAlign: "center",
        border: "1px solid black",
        borderCollapse: "collapse",
        marginBottom: 15
    },
    thCn: {
        border: "1px solid black",
        borderCollapse: "collapse"
    },
    tdCn: {
        border: "1px solid black",
        borderCollapse: "collapse"
    },
    txtIn: {
        width: 25,
        height: 15,
        marginRight: 5
    },
    btnAdd: {
        color: "blue"
    }
};

export default class InputNodes extends Component {
  constructor(props) {
    super(props);

    this.state = {
        from: "",
        to: "",
        cost: 0
    }

    this.nodeConnections = [];
    
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    });
  }

  handleSubmit(event) {
    console.log("Calculate");
    console.log(this.nodeConnections);

    event.preventDefault();
  }

  addNodeConnection = (e) => {
    e.preventDefault();
    this.nodeConnections.push( [this.state.from, this.state.to, this.state.cost] );
    this.setState({from: "", to:"", cost: 0});
    console.log("Added");
  }

  nodeConnectionsTable = (e) => {
    if(this.nodeConnections.length == 0)
      return <tr><td colSpan="3">Is Empty, add nodes</td></tr>;
    return ( 
      this.nodeConnections.map( (connection) =>
        <tr key={connection[0].toString()+connection[1].toString()+connection[2].toString()}>
            <td style={divStyle.tdCn}>{connection[0].toString()}</td>
            <td style={divStyle.tdCn}>{connection[1].toString()}</td>
            <td style={divStyle.tdCn}>{connection[2].toString()}</td>
        </tr>
      )
    )
  }

  render() {
    return (
      <div>
        <h4>Nodes Connections</h4>
        <table style={divStyle.tbCn}>
          <thead>
            <tr>
              <th style={divStyle.thCn}>From</th>
              <th style={divStyle.thCn}>To</th>
              <th style={divStyle.thCn}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {this.nodeConnectionsTable()}
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit}>
          <label>
            From:
            <input style={divStyle.txtIn} type="text" name="from" value={this.state.from} onChange={this.handleChangeInput} />
          </label>
          <label>
            To:
            <input style={divStyle.txtIn} type="text" name="to" value={this.state.to} onChange={this.handleChangeInput} />
          </label>
          <label>
            Cost:
            <input style={{width: 45, height: 15, marginRight: 5}} type="number" name="cost" value={this.state.cost} onChange={this.handleChangeInput} />
          </label>
          <p/>
          <button style={divStyle.btnAdd} onClick={ this.addNodeConnection }>Add Node Connection</button>
          <p/>
          <input type="submit" value="Calculate" />
        </form>
      </div>
    );
  }
}