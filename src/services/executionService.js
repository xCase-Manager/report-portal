import Configuration from '../configuration';

/*
* Execution data service
*/
class ExecutionService {

    constructor() {
      this.config = new Configuration();
      this.executions = [];
    }

    /*
    * get execution
    * @input id (optional)
    * @output promise (an execution or list of execution)
    */
    async retrieveExecutions(id) {
      if(id !== undefined)
        return this.retrieveData(
          this.config.EXECUTION_COLLECTION_URL + "/" + id);
      else return this.retrieveData(
          this.config.EXECUTION_COLLECTION_URL);
    }

    /*
    * get testcase
    * @input id (optional)
    * @output promise (a testcase or list of testcases)
    */
    async retrieveTestcases(id) {
      if(id !== undefined)
        return this.retrieveData(
          this.config.TESTCASE_COLLECTION_URL + "/" + id);
      else return this.retrieveData(
          this.config.TESTCASE_COLLECTION_URL);
    }

    /*
    * get project
    * @input id (optional)
    * @output promise (a project or list of projects)
    */
    async retrieveProjects(id) {
      if(id !== undefined)
        return this.retrieveData(
          this.config.PROJECT_COLLECTION_URL + "/" + id);
      else return this.retrieveData(
          this.config.PROJECT_COLLECTION_URL);
    }

    async retrieveData(url) {
      return fetch(url)
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

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }

    handleError(error) {
        console.log(error.message);
    }
  }
  export default ExecutionService;