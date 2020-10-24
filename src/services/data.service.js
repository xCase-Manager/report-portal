import ExecutionService from './executionService';

/*
* Mock data functions set
*/
class DataService {

  constructor() {
    this.executionService = new ExecutionService(); 
  }

  // project data from server API and mock
  getData() {
    return new Promise(
      (resolve, reject) => {
        this.executionService.retrieveProjects().then(
          projects => {
            let data = [];
            data.push({
              title: projects[0].name,
              data: this.getRandomDateArray(150)
            });
              
            data.push({
              title: projects[1].name,
              data: this.getRandomArray(20)
            });
              
            data.push({
              title: projects[2].name,
              data: this.getRandomArray(10)
            });
              
            data.push({
              title: projects[3].name,
              data: this.getRandomArray(6)
            });
            resolve(data);
          }  
        )
      }
    );
  }

  // get testcases from server API
  getTestcases() {
    return new Promise(
      (resolve, reject) => {
        this.executionService.retrieveTestcases().then(
          testcases => {
            let data = [];
            data.push({
              "number": testcases.length,
              testcases: testcases
            });
            resolve(data);
          }  
        )
      }
    );
  }

  // mock execution data generation
  getRandomArray(numItems) {
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
  getRandomDateArray(numItems) {  
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
}
export default DataService