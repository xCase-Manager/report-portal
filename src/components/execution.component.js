import React, { Component } from "react";

export default class Execution extends Component {
    render() {
        return (
            <form>
                <h3>New Execution</h3>
                <div className="form-group">
                    <label>Test Case ID</label>
                    <input type="text" className="form-control" placeholder="Test case ID" />
                </div>
                <div className="form-group">
                    <label>Tag</label>
                    <input type="text" className="form-control" placeholder="Tag" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>        
                <button type="submit" className="btn btn-primary btn-block">Create</button>               
            </form>
        );
    }
}