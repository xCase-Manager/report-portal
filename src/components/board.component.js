import React, { Component } from "react";
import ExecutionService from '../shared/mock-execution-service';
import { Chart } from 'chart.js';


Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.executionService = new ExecutionService();
        this.canvasRef = React.createRef();  
        this.state = {
            data: null
          }; 
    }

    componentDidUpdate() {
        this.boardChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: 100
                    }
                  }
                ]
              }
            },
            data: {
              labels: this.state.data.map(d => d.label),
              datasets: [{
                label: 'Executions',
                data: this.state.data.map(d => d.value),
                backgroundColor: this.state.color
              }]
            }
          }); 
      }
    
      componentDidMount() {
        this.executionService.getStatData().then(data => {
            this.setState({data: data});
        }
      )}
    
      render() {
        return (
            <canvas ref={this.canvasRef} />
        );
      }
}
