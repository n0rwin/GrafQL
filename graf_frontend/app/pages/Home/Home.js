import React, { PropTypes } from 'react';
import Graph from 'react-graph-vis';
import superagent from 'superagent';

let graph = {
  nodes: [
      {id: 1, label: 'Node 1', color: '#e04141'},
      {id: 2, label: 'Node 2', color: '#e09c41'},
      {id: 3, label: 'Node 3', color: '#e0df41'},
      {id: 4, label: 'Node 4', color: '#7be041'},
      {id: 5, label: 'Node 5', color: '#41e0c9'}
    ],
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

let options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: "#000000"
    }
};

let events = {
    select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
}

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.computeGraph = this.computeGraph.bind(this);

        this.state = {
            nodes: graph.nodes,
            edges: graph.edges
        };
    }

    computeGraph(grafs) {
        debugger;
    }

    componentDidMount() {
        let request = superagent(
            'GET',
            'http://localhost:52467/api/graf'
        ).query({query:`{
            graf(id:"9BC29D9F-5FB9-4276-9419-BD30609A1047") {
                id : id
                name : name
                img : img
                vid : vid
                description : description                
            }
        }`})
        .end((error, result) => {
            if (error) {
                console.log(error);                       
            }

            this.computeGraph(result.body);
        });
    }

    render() {
        return (
            <div>
                <h1>GrafQL - Demo</h1>
                <Graph graph={{nodes: this.state.nodes, edges: this.state.edges}} options={options} events={events} />
            </div>
        );
    }
}

Home.propTypes = {
};

Home.contextTypes = {
};

export default Home;
