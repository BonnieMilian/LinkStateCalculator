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
        cost: 1,
        who: ""
    }

    this.nodeConnections = [];
    this.connectionsMatrix = [];
    this.linkStateSteps = [];
    this.N = [];
    
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

  handleSubmit(e) {
    e.preventDefault();
   
    this.connectionsMatrix = [];
    this.linkStateSteps = [];
    this.N = [];

    if(this.nodeConnections.length === 0 || this.state.who === "")
        return;
    
    console.log("Prepare Data");
    //console.log(this.nodeConnections);
    
    for(var cn = 0; cn < this.nodeConnections.length; cn++) {
        if(!this.N.includes(this.nodeConnections[cn][0]))
            this.N.push(this.nodeConnections[cn][0]);
        if(!this.N.includes(this.nodeConnections[cn][1]))
            this.N.push(this.nodeConnections[cn][1]);
    };

    if(!this.N.includes(this.state.who))
        return;

    //console.log(this.N);
    
    for(var cn = 0; cn < this.N.length; cn++) {
        var costs = [];
        for(var cnx = 0; cnx < this.N.length; cnx++)
            costs.push(999999999999999);
        
        this.connectionsMatrix.push(costs);
    }

    var v, w = 0;
    for(var cn = 0; cn < this.nodeConnections.length; cn++) {
        v = this.N.indexOf(this.nodeConnections[cn][0]);
        w = this.N.indexOf(this.nodeConnections[cn][1]);
        if(v != -1 && w != -1 ) {
            this.connectionsMatrix[v][w] = this.nodeConnections[cn][2];
            this.connectionsMatrix[w][v] = this.connectionsMatrix[v][w];
        }  
    };

    console.log(this.connectionsMatrix);


    console.log("Calculate");
    //N'
    var Np = [this.state.who];
    var whoIdx = this.N.indexOf(this.state.who);
    //N' | D(N0) | D(N1) |...| D(Nn-1)
    var NDTable = [[Np.slice()]];
    for(var node = 0; node < this.N.length; node++ ) {
        if(this.N[node] != this.state.who)
            NDTable[0].push(
                this.connectionsMatrix[whoIdx][node] === 999999999999999 ?
                [999999999999999]
                :
                [this.connectionsMatrix[whoIdx][node], this.state.who]
            );
    }

    var step = 1;
    while( this.N.length != Np.length ) {
        var wList = [], lowerWidx = 0, nowho = 1; w = 999999999999999;
        for(var node = 0; node < this.N.length; node++) {
            if(this.N[node] == this.state.who) {
                nowho = 0;
                continue;
            }
            if(!Np.includes(this.N[node])) {
                wList.push([this.N[node], Number(NDTable[step - 1][node + nowho][0]) ]);
                if( Number(NDTable[step - 1][node + nowho][0]) < w) {
                    console.log(NDTable[step - 1][node + nowho]);
                    w = Number(NDTable[step - 1][node + nowho][0]);
                    lowerWidx = wList.length - 1;
                }
            }
        }
        Np.push(wList[lowerWidx][0]);

        console.log( "W list: " + wList + "   lower: " + wList[lowerWidx] );

        NDTable.push([Np.slice()]);

        nowho = 1;
        var wIdx = this.N.indexOf(wList[lowerWidx][0]);
        for(var node = 0; node < this.N.length; node++) {
            if(this.N[node] == this.state.who)
                nowho = 0;
            if(!Np.includes(this.N[node]) && (this.connectionsMatrix[wIdx][node] != 999999999999999))
                NDTable[step].push( [Math.min( Number(NDTable[step - 1][node + nowho][0]) , Number(wList[lowerWidx][1]) + Number(this.connectionsMatrix[wIdx][node]) ), wList[lowerWidx][0] ] );
            else if(this.N[node] != this.state.who)
                NDTable[step].push(NDTable[step - 1][node + nowho]);
        }
        console.log(NDTable);
        step++;
    }

    this.props.updateSolution(this.N, NDTable, this.state.who);
  }

  addNodeConnection = (e) => {
    e.preventDefault();
    if( this.state.from.length === 0 || this.state.to.length === 0 || this.state.to === this.state.from ||  this.state.cost < 0 )
        return;
    this.nodeConnections.push( [this.state.from, this.state.to, this.state.cost] );
    this.setState({from: "", to:"", cost: 1});
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
          <label>
            Which Node:
            <input style={divStyle.txtIn} type="text" name="who" value={this.state.who} onChange={this.handleChangeInput} />
          </label>
          <input type="submit" value="Calculate" />
        </form>
      </div>
    );
  }
}