import React, { Component } from "react";
import MockExecutionService from '../shared/mock-execution-service';
import { Chart } from 'chart.js';
import '../App.css';


Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// BarChart
class BarChart extends React.Component {
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


// LineChart
class LineChart extends React.Component {
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


// Doughnut
class DoughnutChart extends React.Component {
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

// dashboard
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.executionService = new MockExecutionService();

    this.state = {
      data: this.executionService.getData()
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      window.setInterval(async () => {
        const _data = await this.executionService.getData()
        this.setState({
          data: _data
        })
      }, 5000)
    };
    fetchData();
  }

  render() { 
    if(this.state.data!==undefined && this.state.data.length > 0)
      return (
        <div className="App">
          <div className="main chart-wrapper">
            <LineChart
              data={this.state.data[0].data}
              title={this.state.data[0].title}
              color="#3E517A"
            />
          </div>
          <div className="sub chart-wrapper">
            <BarChart
              data={this.state.data[1].data}
              title={this.state.data[1].title}
              color="#70CAD1"
            />
          </div>
          <div className="sub chart-wrapper">
            <BarChart
              data={this.state.data[2].data}
              title={this.state.data[2].title}
              color="#B08EA2"
            />
          </div>
          <div className="sub chart-wrapper">
            <DoughnutChart
              data={this.state.data[3].data}
              title={this.state.data[3].title}
              colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']}
            />
          </div>
        </div>
      );
    else return (
      <div className="App"></div>
    )  
  }
}
