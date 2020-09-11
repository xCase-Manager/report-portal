import Configuration from '../configuration';

class ExecutionService {

    constructor() {
      this.config = new Configuration();
      this.executions = [];
    }

    async retrieveExecutions() {
        return fetch(this.config.EXECUTION_COLLECTION_URL)
        .then(response => {
            if (!response.ok) {
            this.handleResponseError(response);
            }
            return response.json();
        })
        .then(json => {
            this.executions = json;
            return json;
        })
        .catch(error => {
            this.handleError(error);
        });
    }

    async getExecution(executionLink) {
      for(var i = 0; i < this.executions.length; i++) {
        if ( this.executions[i].link === executionLink) {
          return Promise.resolve(this.executions[i]);
        }
      }
      return null;
    }

    async createExecution(execution) {
      console.log("ExecutionService.createExecution():");
      console.log(execution);
      return Promise.resolve(execution);
    }

    async deleteExecution(executionId) {
      console.log("ExecutionService.deleteExecution():");
      console.log("execution ID:" + executionId);
    }

    async updateExecution(execution) {
      console.log("ExecutionService.updateExecution():");
      console.log(execution);
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }

    handleError(error) {
        console.log(error.message);
    }
  }
  export default ExecutionService;