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
    }
};

export default class OutputSteps extends Component {
    constructor(props) {
        super(props);
    }

    nHeader = (e) => {
        console.log(this.props.N);
        var nodes = [];
        for(var node = 0 ; node < this.props.N.length ; node++) {
            if(this.props.Who != this.props.N[node])
                nodes.push(<th style={divStyle.thCn}>{"D("+this.props.N[node].toString()+"), p("+this.props.N[node].toString()+")"}</th>);
        }
        return nodes;
    }

    stepsNodes = (row) => {
        var nodes = [];
        for(var node = 1 ; node < row.length ; node++) {
            nodes.push( <td style={divStyle.tdCn}>{ row[node] == 999999999999999 ? "∞" : ""+row[node][0]+","+row[node][1] }</td> );
        }
        return nodes;
    }

    stepsTable = (e) => {
        var nodes = [];
        for(var node = 0 ; node < this.props.LinkStateSteps.length ; node++) {
            nodes.push(
                <tr key={""+node}>
                    <td style={divStyle.tdCn}>{node}</td>
                    <td style={divStyle.tdCn}>{ "" + this.props.LinkStateSteps[node][0]}</td>
                    { this.stepsNodes(this.props.LinkStateSteps[node]) }
                </tr>
            );
        }
        return nodes;
    }

    render() {
        return (
          <div>
            <table style={divStyle.tbCn}>
                <thead>
                    <tr key="N">
                        <td style={divStyle.tdCn} colSpan={""+(2+this.props.N.length)}>{"N =" + this.props.N }</td>
                    </tr>
                    <tr key="Head">
                        <th style={divStyle.thCn}>Paso</th>
                        <th style={divStyle.thCn}>N'</th>
                        {this.nHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.stepsTable()}
                </tbody>
            </table>
          </div>
        )
    }
}