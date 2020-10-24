import React from "react";
import Chart from 'chart.js';

export default class DoughnutChart extends React.Component {
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
        type: 'doughnut',
        options: {
            maintainAspectRatio: false
        },
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.colors
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
}  