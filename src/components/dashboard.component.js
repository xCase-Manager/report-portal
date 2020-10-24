import React, { Component } from "react";
import LineChart from './linechart.component';
import DoughnutChart from './doughnutchart.component';
import BarChart from './barchart.component';
import DataService from '../services/data.service';
import Chart from 'chart.js';
import '../App.css';


Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// dashboard
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.executionService = new DataService();

    this.state = {
      data: this.executionService.getData(),
      testcaseData: this.executionService.getTestcases()
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      window.setInterval(async () => {
        const _data = await this.executionService.getData()
        const _testcaseData = await this.executionService.getTestcases()
        this.setState({
          data: _data,
          testcaseData: _testcaseData
        })
      }, 5000)
    };
    fetchData();
  }

  render() { 
    
    if(this.state.data!==undefined && this.state.data.length > 0 && 
      this.state.testcaseData!==undefined && this.state.testcaseData.length > 0)
      return (
        <div className="App">
          <div className="main chart-wrapper">
            <LineChart
              data={this.state.data[0].data}
              title={this.state.data[0].title + 
                " (" + this.state.testcaseData[0].number + ")"
              } 
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