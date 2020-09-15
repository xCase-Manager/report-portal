import React, { Component } from "react";
import ExecutionService from '../shared/mock-execution-service';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.executionService = new ExecutionService();
        this.state = {
            executions: null
        };     
    }

    componentDidMount() {
        this.executionService.retrieveExecutions().then(executions => {
            const listExecutions = executions.map((execution) => 
                <li key={execution.id} onClick={() => this.onSelect(execution.link)}>
                    <span className="execution-name">{execution.testcaseId}</span> | {execution.status}
                </li>
            );
            this.setState({executions: listExecutions});
          }
        );     
    }

    render() {
        return (
            <form>
                <h3>Dashboard</h3>
                <div>
                    <h4>Executions list</h4>
                    <p>{this.state.result}</p>
                </div>
                <div>
                    {this.state.executions}
                </div>             
            </form>
        );
    }

    getExecutions() {
        this.executionService.retrieveExecutions().then(executions => {
              this.setState({executions});
            }
        );
    }
}
