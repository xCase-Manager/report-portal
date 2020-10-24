import React from "react";
import Chart from 'chart.js';

export default class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.barChart.data.labels = this.props.data.map(d => d.label);
      this.barChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.barChart.update();
    }
  
    componentDidMount() {
      this.barChart = new Chart(this.canvasRef.current, {
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
          labels: this.props.data.map(d => d.label),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color
          }]
        }
      });
    }
  
    render() {
      return (
          <canvas ref={this.canvasRef} />
      );
    }
}