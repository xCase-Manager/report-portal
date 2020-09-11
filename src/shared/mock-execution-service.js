class ExecutionService {
    constructor() {
      this.executions = [
        {id:"1", testcaseId:"AAA01", state:"fail"},
        {id:"2", testcaseId:"AAA01", state:"success"},
        {id:"3", testcaseId:"AAA02", state:"in queue"},
        {id:"4", testcaseId:"AAA02", state:"executing"},
        {id:"5", testcaseId:"AAA03", state:"not executed"}
      ];
    }
    async retrieveExecutions() {
        return Promise.resolve(this.executions);
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
  }
  export default ExecutionService;