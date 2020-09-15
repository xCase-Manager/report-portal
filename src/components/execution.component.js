import React, { Component } from "react";
import ExecutionService from '../shared/mock-execution-service';

export default class Execution extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.executionService = new ExecutionService();    
    }

    handleSubmit(event) {
        event.preventDefault();
        const execution = new FormData(event.target);
        this.executionService.createExecution(execution).then(execution => {
              console.log(execution);
            }
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>New Execution</h3>
                <div className="form-group">
                    <label>Execution ID</label>
                    <input type="text" className="form-control" placeholder="Execution ID" />
                </div>
                <div className="form-group">
                    <label>Test Case ID</label>
                    <input type="text" className="form-control" placeholder="Test case ID" />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input type="text" className="form-control" placeholder="Enter an execution status" />
                </div>        
                <button type="submit" className="btn btn-primary btn-block">Create</button>               
            </form>
        );
    }
}