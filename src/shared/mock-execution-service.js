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

    async createExecution(execution) {
    
      const content = '{' +
        '"id": ' + parseInt(execution.get("id"), 10) + ', ' +
        '"testcaseId": "' + execution.get("testcaseId") + '", ' + 
        '"status": "' + execution.get("status") + '" ' + 
        '}';
        
      const requestConf = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: content
      };

      return fetch(this.config.EXECUTION_COLLECTION_URL, requestConf)
      .then(response => {
          if (!response.ok)
            this.handleResponseError(response);
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

    getStatData() {
      let data = [];
    
      data.push({
        label: 'AAA01',
        value: 96
      });
    
      data.push({
        label: 'AAA02',
        value: 23
      });
    
      data.push({
        label: 'AAA03',
        value: 38
      });
    
      data.push({
        label: 'AAA04',
        value: 6
      });
    
      return Promise.resolve(data);
    }
  }
  export default ExecutionService;