import React, { Component } from "react";
import ExecutionService from '../shared/mock-execution-service';

export default class Execution extends Component {

    constructor(props) {
        super(props);
        this.executionService = new ExecutionService();   
    }

    componentDidMount() {
        const formElem = document.querySelector('form');

        formElem.addEventListener('submit', (e) => {
            e.preventDefault();
            new FormData(formElem);
        });
        
        formElem.addEventListener('formdata', (e) => {
            let data = e.formData;
            for (var value of data.values()) {
              console.log(value);
            }
           
            this.executionService.createExecution(data).then(execution => {
                console.log(execution);
              }
          );
        });   
    }

    render() {
        return (
            <form encType="multipart/form-data" method="post">
                <h3>New Execution</h3>
                <div className="form-group">
                    <label>Execution ID</label>
                    <input name="id" type="number" className="form-control" placeholder="Execution ID" />
                </div>
                <div className="form-group">
                    <label>Test Case ID</label>
                    <input name="testcaseId" type="text" className="form-control" placeholder="Test case ID" />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input name="status" type="text" className="form-control" placeholder="Enter an execution status" />
                </div>        
                <button type="submit" className="btn btn-primary btn-block">Create</button>               
            </form>
            
        );
    }
}