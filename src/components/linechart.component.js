import React from "react";
import Chart from 'chart.js';

export default class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.barChart.data.labels = this.props.data.map(d => d.time);
      this.barChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.barChart.update();
    }
  
    componentDidMount() {
      this.barChart = new Chart(this.canvasRef.current, {
        type: 'line',
        options: {
                maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'week'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  min: 0
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.data.map(d => d.time),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            fill: 'none',
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
  }