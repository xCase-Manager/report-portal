import Configuration from '../configuration';

class ExecutionService {

    constructor() {
      this.config = new Configuration();
      this.executions = [];
    }

    async retrieveExecutions() {
      return this.retrieveData(this.config.EXECUTION_COLLECTION_URL);
    }

    async retrieveTestcases() {
      return this.retrieveData(this.config.TESTCASE_COLLECTION_URL);
    }

    async retrieveProjects() {
      return this.retrieveData(this.config.PROJECT_COLLECTION_URL);
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

    getData() {
      let data = [];

      data.push({
        title: 'AAA01',
        data: getRandomDateArray(150)
      });
    
      data.push({
        title: 'AAA02',
        data: getRandomArray(20)
      });
    
      data.push({
        title: 'BBB01',
        data: getRandomArray(10)
      });
    
      data.push({
        title: 'BBB02',
        data: getRandomArray(6)
      });
    
      return data;
    }
  }
  export default ExecutionService;


// Data generation
function getRandomArray(numItems) {
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for(var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

// Create random array of objects (with date)
function getRandomDateArray(numItems) {  
  let data = [];
  let baseTime = new Date('2020-04-15T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}